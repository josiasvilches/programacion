import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments.development';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = environment.apiUrl;

  constructor(private userService: UserService) { }

  // Obtener todas las campañas con paginación y filtros
  async getAllCampaignsFromBackend(
    page: number = 1,
    perPage: number = 10,
    estado?: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      if (estado) params.append('estado', estado);

      const url = `${this.apiUrl}/campanas?${params.toString()}`;
      console.log('🔍 Obteniendo campañas desde:', url);

      const token = this.userService.getAuthToken();
      console.log('🔑 Token para GET campañas:', token ? 'Sí (longitud: ' + token.length + ')' : 'No encontrado');
      
      const headers: any = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('✅ Header Authorization agregado al GET');
      } else {
        console.warn('⚠️ No se encontró token para GET campañas');
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      const data = await response.json();
      console.log('📦 Respuesta del backend (GET campañas):', data);

      if (!response.ok) {
        console.error('❌ Error HTTP:', response.status, data);
        return {
          success: false,
          message: data.mensaje || data.error || 'Error al obtener las campañas',
        };
      }

      return {
        success: true,
        data: data,
        message: 'Campañas obtenidas exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al obtener campañas:', error);
      return {
        success: false,
        message: 'Error de conexión al obtener campañas',
      };
    }
  }

  // Crear una nueva campaña
  async createCampaignInBackend(
    campaignData: {
      titulo: string;
      mensaje: string;
      descuento?: string;
      estado?: string;
      fecha_inicio?: string;
      fecha_fin?: string;
    },
    token: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/campanas`;
      console.log('🌐 URL:', url);
      console.log('📤 Datos de campaña:', campaignData);
      console.log('🔑 Token recibido:', token ? 'Sí (longitud: ' + token.length + ')' : 'No');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
      
      console.log('📋 Headers que se enviarán:', {
        'Content-Type': headers['Content-Type'],
        'Authorization': headers['Authorization'] ? 'Bearer [token presente]' : 'No presente'
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(campaignData),
      });

      console.log('📊 Status de respuesta:', response.status, response.statusText);
      const data = await response.json();
      console.log('📥 Respuesta del backend:', data);

      if (!response.ok) {
        return {
          success: false,
          message: data.mensaje || data.error || 'Error al crear la campaña',
        };
      }

      return {
        success: true,
        data: data,
        message: 'Campaña creada exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al crear campaña:', error);
      return {
        success: false,
        message: 'Error de conexión al crear la campaña',
      };
    }
  }

  // Actualizar una campaña existente
  async updateCampaignInBackend(
    campaignId: number,
    campaignData: {
      titulo?: string;
      mensaje?: string;
      descuento?: string;
      estado?: string;
      fecha_inicio?: string;
      fecha_fin?: string;
    },
    token: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/campana/${campaignId}`;
      console.log('📝 Actualizando campaña:', campaignId, campaignData);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();
      console.log('📥 Respuesta:', data);

      if (!response.ok) {
        return {
          success: false,
          message: data.mensaje || data.error || 'Error al actualizar la campaña',
        };
      }

      return {
        success: true,
        data: data,
        message: 'Campaña actualizada exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al actualizar campaña:', error);
      return {
        success: false,
        message: 'Error de conexión al actualizar la campaña',
      };
    }
  }

  // Eliminar una campaña (cambiar estado a finalizada)
  async deleteCampaignInBackend(
    campaignId: number,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${this.apiUrl}/campana/${campaignId}`;
      console.log('🗑️ Eliminando campaña:', campaignId);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('📥 Respuesta:', data);

      if (!response.ok) {
        return {
          success: false,
          message: data.mensaje || data.error || 'Error al eliminar la campaña',
        };
      }

      return {
        success: true,
        message: data.mensaje || 'Campaña eliminada exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al eliminar campaña:', error);
      return {
        success: false,
        message: 'Error de conexión al eliminar la campaña',
      };
    }
  }

  // Obtener campañas activas (público)
  async getActiveCampaigns(): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/campanas/activas`;
      console.log('🔍 Obteniendo campañas activas desde:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.mensaje || data.error || 'Error al obtener campañas activas',
        };
      }

      return {
        success: true,
        data: data,
        message: 'Campañas activas obtenidas exitosamente',
      };
    } catch (error) {
      console.error('❌ Error al obtener campañas activas:', error);
      return {
        success: false,
        message: 'Error de conexión',
      };
    }
  }
}
