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

  // Signals para estado
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(false);

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
      // Obtener todos los pedidos desde el backend (endpoint admin)
      const result = await this.orderService.getAllOrdersFromBackend(1, 100);
      
      if (result.success && result.data) {
        const backendOrders = result.data['pedidos:'] || result.data.pedidos || [];
        const convertedOrders = this.convertBackendOrdersToUI(backendOrders);
        this.orders.set(convertedOrders);
        console.log('Pedidos cargados desde backend:', convertedOrders);
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

  oldOrders: Order[] = [
    {
      id: 1001,
      customer: "María González",
      phone: "+54 9 11 1234-5678",
      email: "maria@email.com",
      status: "preparing",
      total: 2850,
      paymentMethod: "card",
      orderDate: "2025-09-23T14:30:00",
      estimatedTime: 25,
      deliveryType: "pickup",
      items: [
        { name: "Pollo al Spiedo", quantity: 1, price: 1800 },
        { name: "Papas Fritas", quantity: 2, price: 450 },
        { name: "Ensalada Mixta", quantity: 1, price: 600 }
      ],
      timeline: [
        { status: "pending", timestamp: "2025-09-23T14:30:00", user: "Sistema" },
        { status: "preparing", timestamp: "2025-09-23T14:35:00", user: "Juan Pérez" }
      ],
      notes: "Sin cebolla en la ensalada"
    },
    {
      id: 1002,
      customer: "Carlos Rodríguez",
      phone: "+54 9 11 2345-6789",
      email: "carlos@email.com",
      status: "ready",
      total: 1950,
      paymentMethod: "cash",
      orderDate: "2025-09-23T15:15:00",
      estimatedTime: 20,
      deliveryType: "pickup",
      items: [
        { name: "Milanesa Napolitana", quantity: 1, price: 1500 },
        { name: "Coca Cola 500ml", quantity: 2, price: 450 }
      ],
      timeline: [
        { status: "pending", timestamp: "2025-09-23T15:15:00", user: "Sistema" },
        { status: "preparing", timestamp: "2025-09-23T15:20:00", user: "Ana Martínez" },
        { status: "ready", timestamp: "2025-09-23T15:35:00", user: "Ana Martínez" }
      ],
      notes: ""
    },
    {
      id: 1003,
      customer: "Ana Martínez",
      phone: "+54 9 11 3456-7890",
      email: "ana@email.com",
      status: "pending",
      total: 3200,
      paymentMethod: "transfer",
      orderDate: "2024-01-22T15:45:00",
      estimatedTime: 30,
      deliveryType: "pickup",
      items: [
        { name: "Parrillada para 2", quantity: 1, price: 2800 },
        { name: "Vino Tinto", quantity: 1, price: 400 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T15:45:00", user: "Sistema" }
      ],
      notes: "Punto de cocción: jugoso"
    },
    {
      id: 1004,
      customer: "Luis Torres",
      phone: "+54 9 11 4567-8901",
      email: "luis@email.com",
      status: "delivered",
      total: 1650,
      paymentMethod: "card",
      orderDate: "2024-01-22T13:20:00",
      estimatedTime: 25,
      deliveryType: "pickup",
      items: [
        { name: "Empanadas x12", quantity: 1, price: 1200 },
        { name: "Agua Mineral", quantity: 2, price: 450 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T13:20:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T13:25:00", user: "Juan Pérez" },
        { status: "ready", timestamp: "2024-01-22T13:45:00", user: "Juan Pérez" },
        { status: "delivered", timestamp: "2024-01-22T14:10:00", user: "Delivery" }
      ],
      notes: "6 carne, 6 pollo"
    },
    {
      id: 1005,
      customer: "Laura Sánchez",
      phone: "+54 9 11 5678-9012",
      email: "laura@email.com",
      status: "cancelled",
      total: 2100,
      paymentMethod: "cash",
      orderDate: "2024-01-22T12:30:00",
      estimatedTime: 0,
      deliveryType: "pickup",
      items: [
        { name: "Pizza Especial", quantity: 1, price: 1800 },
        { name: "Fanta 500ml", quantity: 1, price: 300 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T12:30:00", user: "Sistema" },
        { status: "cancelled", timestamp: "2024-01-22T12:45:00", user: "Admin", reason: "Sin stock" }
      ],
      notes: "Cancelado por falta de ingredientes"
    },
    {
      id: 1006,
      customer: "Diego Fernández",
      phone: "+54 9 11 6789-0123",
      email: "diego@email.com",
      status: "preparing",
      total: 4200,
      paymentMethod: "card",
      orderDate: "2024-01-22T16:10:00",
      estimatedTime: 35,
      deliveryType: "pickup",
      items: [
        { name: "Matambre a la Pizza", quantity: 1, price: 2200 },
        { name: "Papas Rusticas", quantity: 1, price: 800 },
        { name: "Ensalada Caesar", quantity: 1, price: 750 },
        { name: "Cerveza Quilmes", quantity: 2, price: 450 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:10:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T16:15:00", user: "Carlos López" }
      ],
      notes: "Cocción bien cocido"
    },
    {
      id: 1007,
      customer: "Carmen López",
      phone: "+54 9 11 7890-1234",
      email: "carmen@email.com",
      status: "pending",
      total: 1800,
      paymentMethod: "transfer",
      orderDate: "2024-01-22T16:25:00",
      estimatedTime: 20,
      deliveryType: "pickup",
      items: [
        { name: "Sándwich de Bondiola", quantity: 2, price: 1400 },
        { name: "Agua con Gas", quantity: 2, price: 400 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:25:00", user: "Sistema" }
      ],
      notes: "Extra mostaza"
    },
    {
      id: 1008,
      customer: "Roberto Silva",
      phone: "+54 9 11 8901-2345",
      email: "roberto@email.com",
      status: "ready",
      total: 2650,
      paymentMethod: "cash",
      orderDate: "2024-01-22T15:50:00",
      estimatedTime: 30,
      deliveryType: "pickup",
      items: [
        { name: "Bife de Chorizo", quantity: 1, price: 2200 },
        { name: "Puré de Papas", quantity: 1, price: 450 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T15:50:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T15:55:00", user: "Ana Martínez" },
        { status: "ready", timestamp: "2024-01-22T16:20:00", user: "Ana Martínez" }
      ],
      notes: "Punto a punto"
    },
    {
      id: 1009,
      customer: "Patricia Ruiz",
      phone: "+54 9 11 9012-3456",
      email: "patricia@email.com",
      status: "delivered",
      total: 3150,
      paymentMethod: "card",
      orderDate: "2024-01-22T12:15:00",
      estimatedTime: 25,
      deliveryType: "pickup",
      items: [
        { name: "Pollo Grillado", quantity: 1, price: 1600 },
        { name: "Arroz Primavera", quantity: 1, price: 650 },
        { name: "Postre Flan", quantity: 2, price: 900 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T12:15:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T12:20:00", user: "Juan Pérez" },
        { status: "ready", timestamp: "2024-01-22T12:40:00", user: "Juan Pérez" },
        { status: "delivered", timestamp: "2024-01-22T13:05:00", user: "Cliente" }
      ],
      notes: "Sin sal en el arroz"
    },
    {
      id: 1010,
      customer: "Fernando Castro",
      phone: "+54 9 11 0123-4567",
      email: "fernando@email.com",
      status: "preparing",
      total: 5200,
      paymentMethod: "transfer",
      orderDate: "2024-01-22T16:35:00",
      estimatedTime: 40,
      deliveryType: "pickup",
      items: [
        { name: "Asado de Tira", quantity: 1, price: 2500 },
        { name: "Chorizo Colorado", quantity: 2, price: 1200 },
        { name: "Morcilla", quantity: 2, price: 800 },
        { name: "Chimichurri", quantity: 1, price: 200 },
        { name: "Pan Casero", quantity: 1, price: 300 },
        { name: "Vino Malbec", quantity: 1, price: 1200 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:35:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T16:40:00", user: "Carlos López" }
      ],
      notes: "Para llevar caliente - evento familiar"
    },
    {
      id: 1011,
      customer: "Mónica Herrera",
      phone: "+54 9 11 1357-2468",
      email: "monica@email.com",
      status: "pending",
      total: 1450,
      paymentMethod: "cash",
      orderDate: "2024-01-22T16:45:00",
      estimatedTime: 15,
      deliveryType: "pickup",
      items: [
        { name: "Tarta de Jamón y Queso", quantity: 1, price: 950 },
        { name: "Jugo de Naranja", quantity: 2, price: 500 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:45:00", user: "Sistema" }
      ],
      notes: "Urgente - horario de almuerzo"
    },
    {
      id: 1012,
      customer: "Alejandro Morales",
      phone: "+54 9 11 2468-1357",
      email: "alejandro@email.com",
      status: "delivered",
      total: 2900,
      paymentMethod: "card",
      orderDate: "2024-01-22T11:30:00",
      estimatedTime: 30,
      deliveryType: "pickup",
      items: [
        { name: "Cordero Patagónico", quantity: 1, price: 2400 },
        { name: "Papas Andinas", quantity: 1, price: 500 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T11:30:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T11:35:00", user: "Carlos López" },
        { status: "ready", timestamp: "2024-01-22T12:00:00", user: "Carlos López" },
        { status: "delivered", timestamp: "2024-01-22T12:25:00", user: "Cliente" }
      ],
      notes: "Cocción rosa, sin ajo"
    },
    {
      id: 1013,
      customer: "Valeria Sosa",
      phone: "+54 9 11 3691-4702",
      email: "valeria@email.com",
      status: "ready",
      total: 1750,
      paymentMethod: "transfer",
      orderDate: "2024-01-22T16:00:00",
      estimatedTime: 20,
      deliveryType: "pickup",
      items: [
        { name: "Pasta Casera", quantity: 1, price: 1200 },
        { name: "Salsa Bolognesa", quantity: 1, price: 350 },
        { name: "Queso Rallado", quantity: 1, price: 200 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:00:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T16:05:00", user: "Ana Martínez" },
        { status: "ready", timestamp: "2024-01-22T16:20:00", user: "Ana Martínez" }
      ],
      notes: "Pasta al dente"
    },
    {
      id: 1014,
      customer: "Sebastián Vega",
      phone: "+54 9 11 4815-5926",
      email: "sebastian@email.com",
      status: "cancelled",
      total: 3800,
      paymentMethod: "card",
      orderDate: "2024-01-22T14:00:00",
      estimatedTime: 0,
      deliveryType: "pickup",
      items: [
        { name: "Paella Valenciana", quantity: 1, price: 3200 },
        { name: "Sangría", quantity: 1, price: 600 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T14:00:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T14:05:00", user: "Juan Pérez" },
        { status: "cancelled", timestamp: "2024-01-22T14:30:00", user: "Cliente", reason: "Cambio de planes" }
      ],
      notes: "Cliente canceló por cambio de planes"
    },
    {
      id: 1015,
      customer: "Isabella Cruz",
      phone: "+54 9 11 5927-3840",
      email: "isabella@email.com",
      status: "preparing",
      total: 2200,
      paymentMethod: "cash",
      orderDate: "2024-01-22T16:50:00",
      estimatedTime: 25,
      deliveryType: "pickup",
      items: [
        { name: "Pescado a la Plancha", quantity: 1, price: 1800 },
        { name: "Ensalada Verde", quantity: 1, price: 400 }
      ],
      timeline: [
        { status: "pending", timestamp: "2024-01-22T16:50:00", user: "Sistema" },
        { status: "preparing", timestamp: "2024-01-22T16:52:00", user: "Ana Martínez" }
      ],
      notes: "Sin limón, alérgica a cítricos"
    }
  ];

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

  async refreshOrders() {
    await this.loadOrdersFromBackend();
    alert('Datos actualizados exitosamente.');
  }

  printOrder(orderId: number) {
    alert(`Imprimiendo pedido #${orderId}...`);
  }

  editOrder(orderId: number) {
    alert('Función de edición en desarrollo...');
  }
}
