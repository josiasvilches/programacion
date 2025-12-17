import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface TimelineEvent {
  status: string;
  timestamp: string;
  user: string;
  reason?: string;
  comments?: string;
}

interface Order {
  id: number;
  customer: string;
  phone: string;
  email: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  orderDate: string;
  estimatedTime: number;
  deliveryType: string;
  items: OrderItem[];
  timeline: TimelineEvent[];
  notes: string;
}

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  showOrderModal = false;
  showCancelModal = false;
  currentFilter = 'all';
  currentOrderId: number | null = null;
  searchTerm = '';
  dateFilter = 'all';
  paymentFilter = 'all';

  // Paginación
  currentPage = 1;
  totalPages = 1;
  totalOrders = 0;
  ordersPerPage = 10;

  // Signals para estado
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);

  // Exponer Math para el template
  Math = Math;

  // Cancel modal data
  cancelOrderData = {
    reason: '',
    comments: ''
  };

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.loadOrdersFromBackend();
  }

  // Cargar pedidos desde el backend
  async loadOrdersFromBackend() {
    this.isLoading.set(true);
    try {
      // Obtener pedidos con paginación
      const result = await this.orderService.getAllOrdersFromBackend(
        this.currentPage, 
        this.ordersPerPage
      );
      
      if (result.success && result.data) {
        const backendOrders = result.data['pedidos:'] || result.data.pedidos || [];
        const convertedOrders = this.convertBackendOrdersToUI(backendOrders);
        this.orders.set(convertedOrders);
        
        // Actualizar información de paginación
        this.totalPages = result.data.pages || 1;
        this.totalOrders = result.data.total || 0;
        
        console.log('Pedidos cargados desde backend:', convertedOrders);
        console.log(`Página ${this.currentPage} de ${this.totalPages} (Total: ${this.totalOrders})`);
      } else {
        console.error('Error al cargar pedidos:', result.message);
        alert('Error al cargar pedidos del servidor');
      }
    } catch (error) {
      console.error('Error al cargar pedidos desde backend:', error);
      alert('Error de conexión al cargar pedidos');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Convertir pedidos del backend al formato de la UI
  convertBackendOrdersToUI(backendOrders: any[]): Order[] {
    console.log('=== CONVIRTIENDO PEDIDOS DEL BACKEND ===');
    console.log('Total pedidos recibidos:', backendOrders.length);
    
    return backendOrders.map(pedido => {
      console.log('Procesando pedido:', pedido.pedido_id);
      console.log('Pedido completo:', JSON.stringify(pedido, null, 2));
      
      // Mapear estado del backend al formato UI
      const statusMap: { [key: string]: Order['status'] } = {
        'pendiente': 'pending',
        'preparando': 'preparing',
        'listo': 'ready',
        'entregado': 'delivered',
        'cancelado': 'cancelled'
      };

      // Mapear método de pago
      const paymentMap: { [key: string]: Order['paymentMethod'] } = {
        'efectivo': 'cash',
        'tarjeta': 'card',
        'transferencia': 'transfer',
        'digital': 'transfer'
      };

      // Construir items del pedido - el backend devuelve 'producto' (singular)
      const productosArray = pedido.producto || pedido.productos || [];
      console.log('Array de productos encontrado:', productosArray);
      console.log('Cantidad de productos:', productosArray.length);
      
      const items: OrderItem[] = productosArray.map((prod: any) => {
        console.log('Mapeando producto:', prod);
        return {
          name: prod.nombre_producto || 'Producto sin nombre',
          quantity: prod.cantidad || 1,
          price: prod.precio_unitario || 0
        };
      });
      
      console.log('Items finales:', items);

      return {
        id: pedido.pedido_id,
        customer: `Cliente #${pedido.id_cliente}`,
        phone: '-',
        email: '-',
        status: statusMap[pedido.estado_pedido?.toLowerCase()] || 'pending',
        total: pedido.total || 0,
        paymentMethod: paymentMap[pedido.metodo_pago?.toLowerCase()] || 'cash',
        orderDate: pedido.fecha_pedido || new Date().toISOString(),
        estimatedTime: 30,
        deliveryType: 'pickup',
        items: items,
        timeline: [{
          status: statusMap[pedido.estado_pedido?.toLowerCase()] || 'pending',
          timestamp: pedido.fecha_pedido || new Date().toISOString(),
          user: 'Sistema'
        }],
        notes: pedido.hora_retiro || ''
      };
    });
  }

  // Filter and search methods
  getFilteredOrders(): Order[] {
    let filtered = this.orders();
    
    // Filter by status
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(order => order.status === this.currentFilter);
    }
    
    // Filter by date
    if (this.dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        
        switch (this.dateFilter) {
          case 'today':
            return orderDate >= today;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return orderDate >= yesterday && orderDate < today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return orderDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }
    
    // Filter by payment method
    if (this.paymentFilter !== 'all') {
      filtered = filtered.filter(order => order.paymentMethod === this.paymentFilter);
    }
    
    // Search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.phone.includes(searchLower)
      );
    }
    
    return filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }

  filterByStatus(status: string) {
    this.currentFilter = status;
  }

  onSearch() {
    // Search is reactive through getFilteredOrders()
  }

  onDateFilterChange() {
    // Filter is reactive through getFilteredOrders()
  }

  onPaymentFilterChange() {
    // Filter is reactive through getFilteredOrders()
  }

  // Order actions
  async changeOrderStatus(orderId: number, event: Event) {
    event.stopPropagation();
    const order = this.orders().find(o => o.id === orderId);
    if (!order) return;
    
    const statusFlow = {
      'pending': 'preparing',
      'preparing': 'ready',
      'ready': 'delivered'
    };
    
    const nextStatus = statusFlow[order.status as keyof typeof statusFlow];
    if (!nextStatus) {
      alert('Este pedido no puede avanzar más en el flujo.');
      return;
    }

    // Mapear estado UI a backend
    const backendStatusMap: { [key: string]: string } = {
      'pending': 'pendiente',
      'preparing': 'preparando',
      'ready': 'listo',
      'delivered': 'entregado',
      'cancelled': 'cancelado'
    };

    this.isLoading.set(true);
    try {
      // Actualizar estado en el backend
      const result = await this.orderService.updateOrderStatusInBackend(
        orderId,
        backendStatusMap[nextStatus] as any
      );

      if (result.success) {
        // Actualizar localmente
        order.status = nextStatus as any;
        order.timeline.push({
          status: nextStatus,
          timestamp: new Date().toISOString(),
          user: 'Admin'
        });

        // Actualizar el signal
        this.orders.set([...this.orders()]);
        
        alert(`Pedido #${orderId} actualizado a: ${this.getStatusName(nextStatus)}`);
      } else {
        alert(`Error al actualizar el pedido: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      alert('Error al actualizar el estado del pedido');
    } finally {
      this.isLoading.set(false);
    }
  }

  openCancelModal(orderId: number, event: Event) {
    event.stopPropagation();
    this.currentOrderId = orderId;
    this.cancelOrderData.reason = '';
    this.cancelOrderData.comments = '';
    this.showCancelModal = true;
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.currentOrderId = null;
  }

  async confirmCancelOrder() {
    if (!this.cancelOrderData.reason) {
      alert('Por favor selecciona un motivo de cancelación.');
      return;
    }
    
    const order = this.orders().find(o => o.id === this.currentOrderId);
    if (!order) return;

    this.isLoading.set(true);
    try {
      // Actualizar estado en el backend
      const result = await this.orderService.updateOrderStatusInBackend(
        this.currentOrderId!,
        'cancelado'
      );

      if (result.success) {
        // Actualizar localmente
        order.status = 'cancelled';
        order.timeline.push({
          status: 'cancelled',
          timestamp: new Date().toISOString(),
          user: 'Admin',
          reason: this.cancelOrderData.reason,
          comments: this.cancelOrderData.comments
        });

        // Actualizar el signal
        this.orders.set([...this.orders()]);
        
        this.closeCancelModal();
        alert(`Pedido #${this.currentOrderId} cancelado exitosamente.`);
      } else {
        alert(`Error al cancelar el pedido: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al cancelar pedido:', error);
      alert('Error al cancelar el pedido');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Modal functions
  openOrderModal(orderId: number) {
    const order = this.orders().find(o => o.id === orderId);
    if (!order) return;
    
    this.currentOrderId = orderId;
    this.showOrderModal = true;
  }

  closeOrderModal() {
    this.showOrderModal = false;
    this.currentOrderId = null;
  }

  getCurrentOrder(): Order | null {
    return this.orders().find(o => o.id === this.currentOrderId) || null;
  }

  // Utility methods
  getStatusName(status: string): string {
    const names = {
      'pending': 'Pendiente',
      'preparing': 'En Preparación',
      'ready': 'Listo',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return names[status as keyof typeof names] || status;
  }

  getPaymentMethodName(method: string): string {
    const names = {
      'cash': 'Efectivo',
      'card': 'Tarjeta',
      'transfer': 'Transferencia'
    };
    return names[method as keyof typeof names] || method;
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-AR');
  }

  getMinutesSinceOrder(orderDate: string): number {
    const now = new Date();
    const order = new Date(orderDate);
    return Math.floor((now.getTime() - order.getTime()) / (1000 * 60));
  }

  getFilterClass(filter: string): string {
    return this.currentFilter === filter
      ? 'filter-btn active px-4 py-2 rounded-lg font-medium transition-all duration-200'
      : 'filter-btn px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200';
  }

  getEmptyMessage(): string {
    if (this.searchTerm) {
      return `No se encontraron pedidos que coincidan con "${this.searchTerm}"`;
    }

    const messages: { [key: string]: string } = {
      'all': 'No hay pedidos registrados en el sistema.',
      'pending': 'No hay pedidos pendientes en este momento.',
      'preparing': 'No hay pedidos en preparación en este momento.',
      'ready': 'No hay pedidos listos para retirar en este momento.',
      'delivered': 'No hay pedidos entregados en este momento.',
      'cancelled': 'No hay pedidos cancelados en este momento.'
    };

    return messages[this.currentFilter] || 'No hay pedidos disponibles.';
  }

  async refreshOrders() {
    await this.loadOrdersFromBackend();
    alert('Datos actualizados exitosamente.');
  }

  // Métodos de paginación
  async goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      await this.loadOrdersFromBackend();
    }
  }

  async nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.loadOrdersFromBackend();
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadOrdersFromBackend();
    }
  }

  async firstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      await this.loadOrdersFromBackend();
    }
  }

  async lastPage() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      await this.loadOrdersFromBackend();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  printOrder(orderId: number) {
    alert(`Imprimiendo pedido #${orderId}...`);
  }

  editOrder(orderId: number) {
    alert('Función de edición en desarrollo...');
  }
}
