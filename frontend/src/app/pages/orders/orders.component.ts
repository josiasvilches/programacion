import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

type OrderStatus = 'all' | 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
type DateFilter = 'all' | 'today' | 'week' | 'month' | 'custom';
type AmountFilter = 'all' | '0-2000' | '2000-5000' | '5000-10000' | '10000+';
type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'status';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  // Signals for reactive state
  orders = signal<Order[]>([]);
  filteredOrders = signal<Order[]>([]);
  selectedOrder = signal<Order | null>(null);
  isModalOpen = signal<boolean>(false);
  
  // Filter states
  currentStatus = signal<OrderStatus>('all');
  searchQuery = signal<string>('');
  dateFilter = signal<DateFilter>('all');
  amountFilter = signal<AmountFilter>('all');
  sortOption = signal<SortOption>('date-desc');
  customDateFrom = signal<string>('');
  customDateTo = signal<string>('');

  // Computed values
  showCustomDateRange = computed(() => this.dateFilter() === 'custom');
  
  statistics = computed(() => this.orderService.getOrderStatistics());
  
  resultsCount = computed(() => this.filteredOrders().length);

  constructor(
    private orderService: OrderService, 
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.applyFilters();
  }

  private loadOrders() {
    this.orders.set(this.orderService.getOrders());
  }

  // Filter methods
  selectStatus(status: OrderStatus) {
    this.currentStatus.set(status);
    this.applyFilters();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value.toLowerCase());
    this.applyFilters();
  }

  onDateFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.dateFilter.set(target.value as DateFilter);
    this.applyFilters();
  }

  onAmountFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.amountFilter.set(target.value as AmountFilter);
    this.applyFilters();
  }

  onSortChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.sortOption.set(target.value as SortOption);
    this.applyFilters();
  }

  onCustomDateChange() {
    this.applyFilters();
  }

  onCustomDateFromChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.customDateFrom.set(target.value);
    this.applyFilters();
  }

  onCustomDateToChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.customDateTo.set(target.value);
    this.applyFilters();
  }

  clearAllFilters() {
    this.currentStatus.set('all');
    this.searchQuery.set('');
    this.dateFilter.set('all');
    this.amountFilter.set('all');
    this.sortOption.set('date-desc');
    this.customDateFrom.set('');
    this.customDateTo.set('');
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.orders()];

    // Status filter
    if (this.currentStatus() !== 'all') {
      filtered = filtered.filter(order => order.status === this.currentStatus());
    }

    // Search filter
    if (this.searchQuery()) {
      filtered = filtered.filter(order => {
        const searchText = `${order.id} ${order.items.map(item => item.name).join(' ')}`.toLowerCase();
        return searchText.includes(this.searchQuery());
      });
    }

    // Date filter
    filtered = filtered.filter(order => this.passesDateFilter(order.date));

    // Amount filter
    filtered = filtered.filter(order => this.passesAmountFilter(order.total));

    // Apply sorting
    this.sortOrders(filtered);

    this.filteredOrders.set(filtered);
  }

  private passesDateFilter(orderDate: Date): boolean {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (this.dateFilter()) {
      case 'all':
        return true;
      case 'today':
        return orderDate >= today;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return orderDate >= monthAgo;
      case 'custom':
        const fromDate = this.customDateFrom();
        const toDate = this.customDateTo();
        
        if (fromDate && orderDate < new Date(fromDate)) return false;
        if (toDate && orderDate > new Date(toDate + 'T23:59:59')) return false;
        
        return true;
      default:
        return true;
    }
  }

  private passesAmountFilter(total: number): boolean {
    switch (this.amountFilter()) {
      case 'all':
        return true;
      case '0-2000':
        return total <= 2000;
      case '2000-5000':
        return total > 2000 && total <= 5000;
      case '5000-10000':
        return total > 5000 && total <= 10000;
      case '10000+':
        return total > 10000;
      default:
        return true;
    }
  }

  private sortOrders(orders: Order[]) {
    switch (this.sortOption()) {
      case 'date-desc':
        orders.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case 'date-asc':
        orders.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case 'amount-desc':
        orders.sort((a, b) => b.total - a.total);
        break;
      case 'amount-asc':
        orders.sort((a, b) => a.total - b.total);
        break;
      case 'status':
        const statusOrder = { pending: 1, preparing: 2, ready: 3, delivered: 4, cancelled: 5 };
        orders.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
    }
  }

  // Order management methods
  viewOrderDetails(order: Order) {
    this.selectedOrder.set(order);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedOrder.set(null);
  }

  async cancelOrder(orderId: number) {
    if (confirm('¿Estás seguro que querés cancelar este pedido?')) {
      const success = this.orderService.cancelOrder(orderId);
      if (success) {
        this.loadOrders();
        this.applyFilters();
        this.closeModal();
        alert('Pedido cancelado correctamente');
      }
    }
  }

  reorderItems(order: Order) {
    const itemsList = order.items
      .map(item => `• ${item.name} (${item.quantity})`)
      .join('\n');
    
    if (confirm(`¿Querés agregar estos productos al carrito?\n\n${itemsList}\n\nTotal: $${order.total.toLocaleString()}`)) {
      // Agregar items al carrito usando ProductService
      const products = this.productService.getAllProducts();
      
      order.items.forEach(orderItem => {
        // Buscar el producto por nombre (en una implementación real usaríamos IDs)
        const product = products.find((p: any) => p.name === orderItem.name);
        if (product) {
          this.cartService.addToCart(product, orderItem.quantity);
        }
      });
      
      this.closeModal();
      alert('Productos agregados al carrito correctamente');
      this.router.navigate(['/cart']);
    }
  }

  // Utility methods
  getStatusName(status: string): string {
    const names = {
      pending: 'Pendiente',
      preparing: 'En preparación',
      ready: 'Listo',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return names[status as keyof typeof names] || status;
  }

  getStatusColorClass(status: string): string {
    const colors = {
      pending: 'status-pending',
      preparing: 'status-preparing',
      ready: 'status-ready',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  }

  getFilterButtonClass(status: string): string {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium smooth-transition';
    if (this.currentStatus() === status) {
      return `${baseClasses} filter-active`;
    }
    return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Navigation methods
  goToProducts() {
    this.router.navigate(['/comidas']);
  }

  continueShopping() {
    this.router.navigate(['/']);
  }
}
