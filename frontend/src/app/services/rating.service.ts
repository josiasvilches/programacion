import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Rating {
  valoracion_id?: number;
  valoracion: number;
  id_usuario: number;
  id_producto: number;
  comentario?: string;
}

export interface RatingVerification {
  puede_valorar: boolean;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  /**
   * Crear una nueva valoración de un producto
   */
  async createRating(rating: Rating): Promise<{ success: boolean; message: string; data?: Rating }> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return {
          success: false,
          message: 'No estás autenticado'
        };
      }

      const response = await fetch(`${this.apiUrl}/valoraciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rating)
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.mensaje || 'Error al crear la valoración'
        };
      }

      return {
        success: true,
        message: 'Valoración creada exitosamente',
        data: data
      };

    } catch (error) {
      console.error('Error al crear valoración:', error);
      return {
        success: false,
        message: 'Error de conexión al crear la valoración'
      };
    }
  }

  /**
   * Verificar si el usuario puede valorar un producto
   */
  async canRateProduct(productId: number, userId: number): Promise<RatingVerification> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return {
          puede_valorar: false,
          mensaje: 'No estás autenticado'
        };
      }

      const response = await fetch(
        `${this.apiUrl}/valoraciones/verificar-compra/${productId}/${userId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        return {
          puede_valorar: false,
          mensaje: 'Error al verificar la compra'
        };
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error al verificar si puede valorar:', error);
      return {
        puede_valorar: false,
        mensaje: 'Error de conexión'
      };
    }
  }

  /**
   * Obtener una valoración específica
   */
  async getRating(ratingId: number): Promise<{ success: boolean; message: string; data?: Rating }> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return {
          success: false,
          message: 'No estás autenticado'
        };
      }

      const response = await fetch(`${this.apiUrl}/valoraciones/${ratingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return {
          success: false,
          message: 'Valoración no encontrada'
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: 'Valoración obtenida exitosamente',
        data: data
      };

    } catch (error) {
      console.error('Error al obtener valoración:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }

  /**
   * Obtener todas las valoraciones de un producto
   */
  async getProductRatings(productId: number): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await fetch(
        `${this.apiUrl}/productos/${productId}/valoraciones`,
        {
          method: 'GET'
        }
      );

      if (!response.ok) {
        return {
          success: false,
          message: 'Error al obtener valoraciones'
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: 'Valoraciones obtenidas exitosamente',
        data: data
      };

    } catch (error) {
      console.error('Error al obtener valoraciones del producto:', error);
      return {
        success: false,
        message: 'Error de conexión'
      };
    }
  }
}
