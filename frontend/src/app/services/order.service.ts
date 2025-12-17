import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/product.interface';
import { environment } from '../../environments/environment';

export interface OrderItem {
  id?: number; // ID del producto para valoraciones
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

  constructor() {}

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
      console.log('Actualizando estado del pedido:', { pedidoId, nuevoEstado, url });

      const body = { estado_pedido: nuevoEstado };
      console.log('Body del request:', JSON.stringify(body));

      // Obtener token de autenticación desde localStorage
      const token = localStorage.getItem('access_token');
      console.log('Token encontrado:', token ? 'Sí' : 'No');

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

      console.log('Status de respuesta:', response.status, response.statusText);

      // Intentar leer la respuesta como JSON
      const responseText = await response.text();
      console.log('Respuesta del servidor (texto):', responseText);
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error al parsear JSON:', e);
        return {
          success: false,
          message: `Respuesta inválida del servidor: ${responseText.substring(0, 100)}`,
        };
      }

      if (!response.ok) {
        console.error('Error HTTP:', response.status, data);
        return {
          success: false,
          message: data.mensaje || data.error || data.msg || 'Error al actualizar el estado del pedido',
        };
      }

      console.log('Estado del pedido actualizado:', data);

      return {
        success: true,
        data: data,
        message: data.mensaje || 'Estado actualizado exitosamente',
      };
    } catch (error) {
      console.error('Error al actualizar estado del pedido:', error);
      return {
        success: false,
        message: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      };
    }
  }
}
