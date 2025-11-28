import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/product.interface';
import { environment } from '../../enviroments/enviroments.development';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  date: Date;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  deliveryAddress: string;
  paymentMethod: string;
  notes: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl;

  private orders = signal<Order[]>([
    {
      id: 1001,
      date: new Date('2024-01-15T19:30:00'),
      status: 'delivered',
      total: 4500,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 1, price: 3500 },
        { name: 'Papas Fritas Caseras', quantity: 1, price: 1000 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Sin cebolla en las papas',
    },
    {
      id: 1002,
      date: new Date('2024-01-14T20:15:00'),
      status: 'cancelled',
      total: 2700,
      items: [{ name: 'Empanadas de Carne (6 unidades)', quantity: 1, price: 2700 }],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Tarjeta',
      notes: 'Cancelado por el cliente',
    },
    {
      id: 1003,
      date: new Date('2024-01-13T18:45:00'),
      status: 'ready',
      total: 6200,
      items: [
        { name: 'Milanesas de Pollo (4 unidades)', quantity: 1, price: 2800 },
        { name: 'Ensalada Mixta', quantity: 1, price: 1500 },
        { name: 'Gaseosa Coca Cola 1.5L', quantity: 2, price: 950 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Transferencia',
      notes: 'Retiro: Hoy a las 19:00',
    },
    {
      id: 1004,
      date: new Date('2024-01-12T21:00:00'),
      status: 'preparing',
      total: 8900,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 2, price: 3500 },
        { name: 'Papas Fritas Caseras', quantity: 2, price: 1000 },
        { name: 'Ensalada Rusa', quantity: 1, price: 900 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Retiro: Mañana a las 21:30',
    },
    {
      id: 1005,
      date: new Date('2024-01-11T19:00:00'),
      status: 'pending',
      total: 3700,
      items: [
        { name: 'Empanadas de Pollo (6 unidades)', quantity: 1, price: 2500 },
        { name: 'Flan Casero', quantity: 1, price: 1200 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Tarjeta',
      notes: 'Retiro: Viernes a las 20:00',
    },
    {
      id: 1006,
      date: new Date('2024-01-10T20:30:00'),
      status: 'delivered',
      total: 12500,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 3, price: 3500 },
        { name: 'Empanadas de Carne (6 unidades)', quantity: 1, price: 2700 },
        { name: 'Papas Fritas Caseras', quantity: 2, price: 1000 },
        { name: 'Gaseosa Coca Cola 1.5L', quantity: 2, price: 950 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Pedido familiar - Retiro completado',
    },
    {
      id: 1007,
      date: new Date('2024-01-09T18:15:00'),
      status: 'delivered',
      total: 5400,
      items: [
        { name: 'Milanesas de Carne (4 unidades)', quantity: 1, price: 3200 },
        { name: 'Puré de Papas', quantity: 1, price: 1000 },
        { name: 'Flan Casero', quantity: 1, price: 1200 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Transferencia',
      notes: 'Descuento aplicado - Retiro completado',
    },
    {
      id: 1008,
      date: new Date('2024-01-08T19:45:00'),
      status: 'delivered',
      total: 4100,
      items: [
        { name: 'Empanadas de Jamón y Queso (6 unidades)', quantity: 1, price: 2400 },
        { name: 'Ensalada Mixta', quantity: 1, price: 1500 },
        { name: 'Agua Mineral 1.5L', quantity: 1, price: 200 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Retiro completado',
    },
    {
      id: 1009,
      date: new Date('2024-01-07T12:30:00'),
      status: 'delivered',
      total: 7800,
      items: [
        { name: 'Pollo al Spiedo Medio', quantity: 1, price: 2500 },
        { name: 'Milanesas de Pollo (4 unidades)', quantity: 1, price: 2800 },
        { name: 'Ensalada Rusa', quantity: 1, price: 900 },
        { name: 'Papas Fritas Caseras', quantity: 2, price: 1000 },
        { name: 'Gaseosa Sprite 1.5L', quantity: 1, price: 950 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Billetera Digital',
      notes: 'Almuerzo familiar - Retiro completado',
    },
    {
      id: 1010,
      date: new Date('2024-01-06T20:45:00'),
      status: 'delivered',
      total: 3200,
      items: [
        { name: 'Empanadas de Carne (6 unidades)', quantity: 1, price: 2700 },
        { name: 'Agua Mineral 1.5L', quantity: 1, price: 200 },
        { name: 'Helado 1L', quantity: 1, price: 1500 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Cena rápida - Retiro completado',
    },
    {
      id: 1011,
      date: new Date('2024-01-05T21:15:00'),
      status: 'delivered',
      total: 15600,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 2, price: 3500 },
        { name: 'Milanesas de Carne (4 unidades)', quantity: 2, price: 3200 },
        { name: 'Empanadas de Pollo (6 unidades)', quantity: 1, price: 2500 },
        { name: 'Ensalada Mixta', quantity: 2, price: 1500 },
        { name: 'Papas Fritas Caseras', quantity: 2, price: 1000 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Transferencia',
      notes: 'Pedido grande para evento - Descuento aplicado - Retiro completado',
    },
    {
      id: 1012,
      date: new Date('2024-01-04T19:20:00'),
      status: 'delivered',
      total: 2800,
      items: [
        { name: 'Empanadas de Jamón y Queso (6 unidades)', quantity: 1, price: 2400 },
        { name: 'Flan Casero', quantity: 1, price: 1200 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Tarjeta',
      notes: 'Merienda - Retiro completado',
    },
    {
      id: 1013,
      date: new Date('2024-01-03T13:45:00'),
      status: 'cancelled',
      total: 4500,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 1, price: 3500 },
        { name: 'Ensalada Rusa', quantity: 1, price: 900 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Cancelado por demora en la preparación',
    },
    {
      id: 1014,
      date: new Date('2024-01-02T18:00:00'),
      status: 'delivered',
      total: 6700,
      items: [
        { name: 'Milanesas de Pollo (4 unidades)', quantity: 1, price: 2800 },
        { name: 'Milanesas de Carne (4 unidades)', quantity: 1, price: 3200 },
        { name: 'Puré de Papas', quantity: 2, price: 1000 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Billetera Digital',
      notes: 'Comparación de milanesas - Retiro completado',
    },
    {
      id: 1015,
      date: new Date('2024-01-01T20:30:00'),
      status: 'delivered',
      total: 18900,
      items: [
        { name: 'Pollo al Spiedo Entero', quantity: 3, price: 3500 },
        { name: 'Empanadas de Carne (6 unidades)', quantity: 2, price: 2700 },
        { name: 'Ensalada Mixta', quantity: 3, price: 1500 },
        { name: 'Papas Fritas Caseras', quantity: 3, price: 1000 },
        { name: 'Gaseosa Coca Cola 1.5L', quantity: 3, price: 950 },
        { name: 'Helado 1L', quantity: 2, price: 1500 },
      ],
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: 'Efectivo',
      notes: 'Cena de Año Nuevo - Pedido especial - Retiro completado',
    },
  ]);

  constructor() {}

  getOrders() {
    return this.orders();
  }

  getOrderById(id: number): Order | undefined {
    return this.orders().find((order) => order.id === id);
  }

  addOrder(order: Omit<Order, 'id'>): Order {
    const newId = Math.max(...this.orders().map((o) => o.id)) + 1;
    const newOrder = { ...order, id: newId };
    this.orders.update((orders) => [...orders, newOrder]);
    return newOrder;
  }

  updateOrderStatus(id: number, status: Order['status'], notes?: string): boolean {
    const orderIndex = this.orders().findIndex((order) => order.id === id);
    if (orderIndex === -1) return false;

    this.orders.update((orders) => {
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = {
        ...updatedOrders[orderIndex],
        status,
        notes: notes || updatedOrders[orderIndex].notes,
      };
      return updatedOrders;
    });

    return true;
  }

  cancelOrder(id: number): boolean {
    return this.updateOrderStatus(id, 'cancelled', 'Cancelado por el cliente');
  }

  getOrdersByStatus(status: Order['status']): Order[] {
    return this.orders().filter((order) => order.status === status);
  }

  getOrderStatistics() {
    const orders = this.orders();
    const totalOrders = orders.length;
    const totalSpent = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) =>
      ['pending', 'preparing', 'ready'].includes(o.status)
    ).length;

    const statusCounts = {
      all: totalOrders,
      pending: orders.filter((o) => o.status === 'pending').length,
      preparing: orders.filter((o) => o.status === 'preparing').length,
      ready: orders.filter((o) => o.status === 'ready').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };

    return {
      totalOrders,
      totalSpent,
      pendingOrders,
      statusCounts,
    };
  }

  // Método para crear pedido desde carrito (local - para UI)
  createOrderFromCart(cartItems: CartItem[], paymentInfo: any, pickupInfo: any): Order {
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder: Omit<Order, 'id'> = {
      date: new Date(),
      status: 'pending',
      total,
      items: orderItems,
      deliveryAddress: 'Retiro en local - Av. Corrientes 1234, CABA',
      paymentMethod: paymentInfo.name || 'Efectivo',
      notes: `Retiro: ${pickupInfo.day} a las ${pickupInfo.time}`,
    };

    return this.addOrder(newOrder);
  }

  // Método para crear pedido en el backend
  async createOrderInBackend(
    idCliente: number,
    cartItems: CartItem[],
    paymentMethod: string,
    pickupTime: string,
    pickupDate?: Date
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      // Formatear fecha en formato YYYY-MM-DD
      const fechaPedido = pickupDate
        ? pickupDate.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      // Mapear método de pago al formato esperado por el backend
      const metodoPagoMap: { [key: string]: string } = {
        Efectivo: 'efectivo',
        'Tarjeta de Débito/Crédito': 'tarjeta',
        'Transferencia Bancaria': 'transferencia',
        'Billeteras Digitales': 'digital',
      };

      const metodoPago = metodoPagoMap[paymentMethod] || 'efectivo';

      // Construir array de productos
      const productos = cartItems.map((item) => ({
        id_producto: item.product.id,
        cantidad: item.quantity,
        precio_unitario: item.product.price,
        subtotal: item.product.price * item.quantity,
      }));

      // Construir el body del request
      const body = {
        id_cliente: idCliente,
        estado_pedido: 'pendiente',
        metodo_pago: metodoPago,
        fecha_pedido: fechaPedido,
        hora_retiro: pickupTime,
        productos: productos,
      };

      console.log('Enviando pedido al backend:', body);

      // Realizar el POST al backend
      const response = await fetch('http://127.0.0.1:5001/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al crear el pedido',
        };
      }

      const data = await response.json();
      console.log('Respuesta del backend:', data);

      return {
        success: true,
        data: data,
        message: 'Pedido creado exitosamente',
      };
    } catch (error) {
      console.error('Error al crear pedido en backend:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Método para obtener pedidos de un usuario específico desde el backend
  async getUserOrdersFromBackend(
    idUsuario: number,
    page: number = 1,
    perPage: number = 10,
    filters?: {
      fecha?: string;
      estado?: string;
      metodo_pago?: string;
    }
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      // Construir query params
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      // Agregar filtros opcionales
      if (filters?.fecha) params.append('fecha', filters.fecha);
      if (filters?.estado) params.append('estado', filters.estado);
      if (filters?.metodo_pago) params.append('metodo_pago', filters.metodo_pago);

      const url = `${this.apiUrl}/pedidos/usuario/${idUsuario}?${params.toString()}`;
      console.log('Obteniendo pedidos del usuario desde:', url);

      // Realizar el GET al backend
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al obtener los pedidos',
        };
      }

      const data = await response.json();
      console.log('Pedidos del usuario obtenidos:', data);

      return {
        success: true,
        data: data,
        message: 'Pedidos obtenidos exitosamente',
      };
    } catch (error) {
      console.error('Error al obtener pedidos del usuario:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Método para obtener todos los pedidos desde el backend (admin)
  async getAllOrdersFromBackend(
    page: number = 1,
    perPage: number = 10,
    filters?: {
      fecha?: string;
      estado?: string;
      metodo_pago?: string;
      usuario?: string;
    }
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      // Construir query params
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      // Agregar filtros opcionales
      if (filters?.fecha) params.append('fecha', filters.fecha);
      if (filters?.estado) params.append('estado', filters.estado);
      if (filters?.metodo_pago) params.append('metodo_pago', filters.metodo_pago);
      if (filters?.usuario) params.append('usuario', filters.usuario);

      const url = `${this.apiUrl}/pedidos?${params.toString()}`;
      console.log('Obteniendo todos los pedidos desde:', url);

      // Realizar el GET al backend
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al obtener los pedidos',
        };
      }

      const data = await response.json();
      console.log('Todos los pedidos obtenidos:', data);

      return {
        success: true,
        data: data,
        message: 'Pedidos obtenidos exitosamente',
      };
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Método para actualizar el estado de un pedido en el backend
  async updateOrderStatusInBackend(
    pedidoId: number,
    nuevoEstado: 'pendiente' | 'preparando' | 'listo' | 'entregado' | 'cancelado'
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/pedido/${pedidoId}`;
      console.log('🔄 Actualizando estado del pedido:', { pedidoId, nuevoEstado, url });

      const body = { estado_pedido: nuevoEstado };
      console.log('📤 Body del request:', JSON.stringify(body));

      // Obtener token de autenticación desde localStorage
      const token = localStorage.getItem('access_token');
      console.log('🔑 Token encontrado:', token ? 'Sí' : 'No');

      if (!token) {
        return {
          success: false,
          message: 'No hay sesión activa. Por favor inicia sesión nuevamente.'
        };
      }

      // Realizar el PUT al backend con autorización
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      console.log('📥 Status de respuesta:', response.status, response.statusText);

      // Intentar leer la respuesta como JSON
      const responseText = await response.text();
      console.log('📥 Respuesta del servidor (texto):', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('❌ Error al parsear JSON:', e);
        return {
          success: false,
          message: `Respuesta inválida del servidor: ${responseText.substring(0, 100)}`,
        };
      }

      if (!response.ok) {
        console.error('❌ Error HTTP:', response.status, data);
        return {
          success: false,
          message: data.mensaje || data.error || data.msg || 'Error al actualizar el estado del pedido',
        };
      }

      console.log('✅ Estado del pedido actualizado:', data);

      return {
        success: true,
        data: data,
        message: data.mensaje || 'Estado actualizado exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al actualizar estado del pedido:', error);
      return {
        success: false,
        message: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      };
    }
  }
}
