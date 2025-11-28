import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

interface DashboardStats {
  label: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: string;
  bgColor: string;
  textColor: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'preparing' | 'ready' | 'pending';
  statusText: string;
  statusClass: string;
}

interface RecentActivity {
  icon: string;
  iconBg: string;
  message: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // Signal para los pedidos recientes
  recentOrders = signal<RecentOrder[]>([]);
  isLoadingOrders = signal<boolean>(false);

  stats: DashboardStats[] = [
    {
      label: 'Pedidos Hoy',
      value: 47,
      change: '↗ +12% vs ayer',
      changeType: 'positive',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Ingresos Hoy',
      value: '$28,450',
      change: '↗ +8% vs ayer',
      changeType: 'positive',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Clientes Activos',
      value: '1,247',
      change: '↗ +23 nuevos',
      changeType: 'positive',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      label: 'Tiempo Promedio',
      value: '23 min',
      change: '↗ +2 min vs ayer',
      changeType: 'negative',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      iconBg: 'bg-green-100',
      message: 'Pedido #1004 entregado exitosamente',
      time: 'Hace 5 minutos'
    },
    {
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      iconBg: 'bg-blue-100',
      message: 'Nuevo producto agregado: "Empanadas de Humita"',
      time: 'Hace 15 minutos'
    },
    {
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      iconBg: 'bg-purple-100',
      message: 'Nuevo cliente registrado: Roberto Silva',
      time: 'Hace 32 minutos'
    }
  ];

  quickActions = [
    {
      title: 'Ver Pedidos',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      textColor: 'text-blue-600',
      route: '/admin/orders'
    },
    {
      title: 'Gestionar Menú',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      bgColor: 'bg-green-50 hover:bg-green-100',
      textColor: 'text-green-600',
      route: '/admin/products'
    },
    {
      title: 'Ver Usuarios',
      icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-600',
      route: '/admin/users'
    },
    {
      title: 'Marketing',
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-600',
      route: '/admin/email'
    }
  ];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.loadRecentOrders();
  }

  async loadRecentOrders() {
    console.log('🔄 Cargando últimos 3 pedidos...');
    this.isLoadingOrders.set(true);
    
    try {
      // Obtener los últimos 3 pedidos del backend
      const result = await this.orderService.getAllOrdersFromBackend(1, 3);
      console.log('📦 Respuesta del servicio:', result.data);
      if (result.success && result.data) {
        const backendOrders = result.data.pedidos || [];
        console.log('📦 Pedidos recibidos del backend:', backendOrders);
        
        // Convertir los pedidos al formato de la UI
        const convertedOrders = this.convertBackendOrdersToUI(backendOrders);
        this.recentOrders.set(convertedOrders);
        console.log('✅ Pedidos convertidos:', convertedOrders);
      } else {
        console.error('❌ Error al cargar pedidos:', result.message);
      }
    } catch (error) {
      console.error('❌ Error al cargar pedidos recientes:', error);
    } finally {
      this.isLoadingOrders.set(false);
    }
  }

  convertBackendOrdersToUI(backendOrders: any[]): RecentOrder[] {
    return backendOrders.map(pedido => {
      // Mapear estados del backend al formato UI
      const statusMap: { [key: string]: RecentOrder['status'] } = {
        'pendiente': 'pending',
        'preparando': 'preparing',
        'listo': 'ready',
        'entregado': 'ready',
        'cancelado': 'pending'
      };

      const statusTextMap: { [key: string]: string } = {
        'pendiente': 'Pendiente',
        'preparando': 'En Preparación',
        'listo': 'Listo',
        'entregado': 'Entregado',
        'cancelado': 'Cancelado'
      };

      const statusClassMap: { [key: string]: string } = {
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'preparando': 'bg-blue-100 text-blue-800',
        'listo': 'bg-purple-100 text-purple-800',
        'entregado': 'bg-green-100 text-green-800',
        'cancelado': 'bg-red-100 text-red-800'
      };

      // Obtener información del cliente
      const clienteNombre = pedido.cliente?.nombre || pedido.usuario?.nombre || 'Cliente Desconocido';
      
      // Obtener productos
      const productos = pedido.producto || pedido.productos || [];
      const primeraLinea = productos.length > 0 ? productos[0].nombre_producto || 'Sin productos' : 'Sin productos';
      const cantidadProductos = productos.length;
      const itemsText = cantidadProductos > 1 
        ? `${primeraLinea} + ${cantidadProductos - 1} más`
        : primeraLinea;

      const estado = pedido.estado?.toLowerCase() || 'pendiente';

      return {
        id: `#${pedido.pedido_id}`,
        customer: clienteNombre,
        items: itemsText,
        total: pedido.total || 0,
        status: statusMap[estado] || 'pending',
        statusText: statusTextMap[estado] || 'Pendiente',
        statusClass: statusClassMap[estado] || 'bg-gray-100 text-gray-800'
      };
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToOrders() {
    this.router.navigate(['/admin/orders']);
  }

  getChangeClass(changeType: 'positive' | 'negative'): string {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  }

  // Método para verificar si el usuario es trabajador
  isWorker(): boolean {
    return this.userService.isTrabajador();
  }

  // Método para obtener acciones rápidas filtradas según el rol
  getFilteredQuickActions() {
    if (this.isWorker()) {
      // TRABAJADOR solo ve Pedidos y Menú
      return this.quickActions.filter(action => 
        action.route === '/admin/orders' || action.route === '/admin/products'
      );
    }
    // ADMIN y EMPLOYER ven todas las acciones
    return this.quickActions;
  }
}
