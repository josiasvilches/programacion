import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../environments/environment';

export type UserRole = 'ADMIN' | 'USER' | 'EMPLOYER' | 'TRABAJADOR';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: string;
  initials?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  mensaje: string;
  refresh_token: string;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  
  // Signal para el usuario actual

  private currentUser = signal<User | null>(null);

  // Signal para el estado de autenticación
  private isAuthenticated = signal<boolean>(false);

  // Signal para el estado de carga
  private isLoading = signal<boolean>(false);

  constructor() {
    // Verificar si hay un token almacenado al inicializar
    if (this.isBrowser()) {
      this.checkStoredToken();
    }
  }

  // Verificar si estamos en el navegador 
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Computed para generar las iniciales automáticamente
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user?.fullName) return 'U';

    return this.generateInitials(user.fullName);
  });

  // Computed para obtener el usuario con iniciales
  user = computed(() => {
    const user = this.currentUser();
    if (!user) return null;

    return {
      ...user,
      initials: this.userInitials(),
    };
  });

  // Getters para los signal
  isLoggedIn = computed(() => this.isAuthenticated());
  loginLoading = computed(() => this.isLoading());

  // Método para generar iniciales desde el nombre completo
  private generateInitials(fullName: string): string {
    const names = fullName.trim().split(' ');

    if (names.length === 1) {
      // Si solo hay un nombre, tomar las primeras dos letras
      return names[0].substring(0, 2).toUpperCase();
    }

    // Tomar la primera letra del primer nombre y la primera del último apellido
    const firstName = names[0];
    const lastName = names[names.length - 1];

    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  // Métodos de autenticación con API
  async login(credentials: LoginRequest): Promise<{ success: boolean; message: string }> {
    this.isLoading.set(true);
    try {
      const response = await fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de login:', errorData);
        return {
          success: false,
          message: errorData.mensaje || 'Error de autenticación',
        };
      }

      const data: LoginResponse = await response.json();
      console.log('Respuesta de login:', data);

      // Guardar tokens
      this.storeTokens(data.access_token, data.refresh_token);

      // Crear objeto de usuario a partir de la respuesta
      const userData = this.extractUserFromToken(data);

      // Guardar datos adicionales del login en localStorage
      this.storeUserData(data);

      // Actualizar los signals
      this.currentUser.set(userData);
      this.isAuthenticated.set(true);

      console.log('Usuario logueado y datos guardados:', userData);

      return {
        success: true,
        message: data.mensaje || 'Login exitoso',
      };
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    } finally {
      this.isLoading.set(false);
    }
  }

  // Métodos para manejo de tokens
  private storeTokens(accessToken: string, refreshToken: string) {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Guardar datos adicionales del usuario en localStorage
  private storeUserData(loginData: LoginResponse) {
    if (this.isBrowser()) {
      const userInfo = {
        rol: loginData.rol,
        mensaje: loginData.mensaje,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      console.log('Datos del usuario guardados en localStorage:', userInfo);
    }
  }

  // Recuperar datos del usuario desde localStorage
  private getUserData(): any {
    if (this.isBrowser()) {
      const userData = localStorage.getItem('user_info');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  private clearTokens() {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_info');
    }
  }

  private getAccessToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  // Extraer información del usuario desde el token de respuesta
  private extractUserFromToken(loginResponse: LoginResponse): User {
    // Decodificar el JWT payload para obtener la información del usuario
    try {
      const payload = JSON.parse(atob(loginResponse.access_token.split('.')[1]));

      return {
        id: parseInt(payload.sub) || 0,
        fullName: payload.nombre || 'Usuario',
        email: payload.email || '',
        role: this.validateRole(loginResponse.rol) || 'USER',
        status: 'Activo',
      };
    } catch (error) {
      console.error('Error decodificando token:', error);
      return {
        id: 0,
        fullName: 'Usuario',
        email: '',
        role: this.validateRole(loginResponse.rol) || 'USER',
        status: 'Activo',
      };
    }
  }

  // Validar que el rol del backend sea uno de los válidos
  private validateRole(role: string): UserRole {
    const validRoles: UserRole[] = ['ADMIN', 'USER', 'EMPLOYER', 'TRABAJADOR'];
    return validRoles.includes(role as UserRole) ? (role as UserRole) : 'USER';
  }

  // Verificar si hay un token almacenado al inicializar
  private checkStoredToken() {
    if (!this.isBrowser()) {
      return; 
    }

    const token = this.getAccessToken();
    const userInfo = this.getUserData();

    if (token) {
      // Verificar si el token no está expirado
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp > currentTime) {
          // Token válido, restaurar usuario
          const userData: User = {
            id: parseInt(payload.sub) || 0,
            fullName: payload.nombre || 'Usuario',
            email: payload.email || '',
            role: this.validateRole(payload.rol || userInfo?.rol) || 'USER',
            status: 'Activo',
          };

          this.currentUser.set(userData);
          this.isAuthenticated.set(true);
          console.log('Usuario restaurado desde localStorage:', userData);
          console.log('Información adicional del usuario:', userInfo);
        } else {
          // Token expirado
          this.clearTokens();
          console.log('Token expirado, sesión limpiada');
        }
      } catch (error) {
        console.error('Error verificando token almacenado:', error);
        this.clearTokens();
      }
    }
  }

  // Método para obtener el token de autorización para las llamadas API
  getAuthToken(): string | null {
    return this.getAccessToken();
  }

  // Método para obtener información adicional del usuario
  getUserInfo(): any {
    return this.getUserData();
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: UserRole): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === role;
  }

  // Métodos específicos para verificar roles
  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isUser(): boolean {
    return this.hasRole('USER');
  }

  isEmployer(): boolean {
    return this.hasRole('EMPLOYER');
  }

  isTrabajador(): boolean {
    return this.hasRole('TRABAJADOR');
  }

  // Método para verificar si tiene permisos administrativos
  hasAdminPermissions(): boolean {
    return this.isAdmin() || this.isEmployer() || this.isTrabajador();
  }

  // Método para obtener todos los datos almacenados del usuario
  getStoredUserData(): { user: User | null; userInfo: any; token: string | null } {
    return {
      user: this.getCurrentUser(),
      userInfo: this.getUserInfo(),
      token: this.getAuthToken(),
    };
  }

  // Método para registrar un nuevo usuario contra el backend
  async register(payload: {
    nombre: string;
    email: string;
    password: string;
    numero?: string;
  }): Promise<{ success: boolean; data?: any; message?: string }> {
    this.isLoading.set(true);
    try {
      const res = await fetch(`${this.apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { success: false, message: data.mensaje || data.error || 'Error en el registro' };
      }

      return { success: true, data, message: data.mensaje || 'Registro exitoso' };
    } catch (error) {
      console.error('Error en register:', error);
      return { success: false, message: 'Error de conexión' };
    } finally {
      this.isLoading.set(false);
    }
  }

  // Método para hacer llamadas autenticadas
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAccessToken();

    const authOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return fetch(url, authOptions);
  }

  // Método para actualizar el usuario 
  updateUser(userData: Partial<User>) {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({
        ...current,
        ...userData,
      });
    }
  }

  // Método para hacer logout
  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.clearTokens();
    console.log('Usuario deslogueado');
  }

  // Método para simular diferentes usuarios 
  switchToUser(userData: User) {
    this.currentUser.set(userData);
  }

  // Método para obtener el usuario actual
  getCurrentUser() {
    return this.currentUser();
  }

  // Obtener todos los usuarios desde el backend 
  async getAllUsersFromBackend(
    page: number = 1,
    perPage: number = 10,
    filters?: {
      nombre?: string;
      rol?: string;
      estado?: string;
    }
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      // Construir query params
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: perPage.toString(),
      });

      // Agregar filtros opcionales
      if (filters?.nombre) params.append('nombre', filters.nombre);
      if (filters?.rol) params.append('rol', filters.rol);
      if (filters?.estado) params.append('estado', filters.estado);

      const url = `${this.apiUrl}/usuarios?${params.toString()}`;
      console.log('Obteniendo usuarios desde:', url);

      // Obtener token de autenticación
      const token = this.getAuthToken();
      const headers: any = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Token agregado al request');
      } else {
        console.warn('No se encontró token de autenticación');
      }

      // Realizar el GET al backend
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        console.error('Error en respuesta HTTP:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Detalles del error:', errorData);
        return {
          success: false,
          message: errorData.mensaje || 'Error al obtener los usuarios',
        };
      }

      const data = await response.json();
      console.log('Usuarios obtenidos del backend:', data);
      console.log('Total de usuarios:', data.total, '| Página:', data.page, '| Páginas totales:', data.pages);

      return {
        success: true,
        data: data,
        message: 'Usuarios obtenidos exitosamente',
      };
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Actualizar un usuario en el backend
  async updateUserInBackend(
    userId: number,
    userData: {
      nombre?: string;
      email?: string;
      numero?: string;
      rol?: string;
      estado?: string;
      password?: string;
    },
    token?: string
  ): Promise<{ success: boolean; data?: any; message: string }> {
    try {
      const url = `${this.apiUrl}/usuario/${userId}`;
      console.log('Actualizando usuario:', { userId, userData });

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token de autorización
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Respuesta completa del backend:', data);
      console.log('Status HTTP:', response.status);

      if (!response.ok) {
        console.error('Error HTTP:', response.status, data);
        return {
          success: false,
          message: data.mensaje || data.message || data.error || 'Error al actualizar el usuario',
        };
      }

      // Verificar si el backend devolvió un error en un 200 OK
      if (data.error || (data.mensaje && data.mensaje.toLowerCase().includes('error'))) {
        console.error('Backend devolvió error:', data);
        return {
          success: false,
          message: data.error || data.mensaje || 'Error al actualizar el usuario',
        };
      }

      console.log('Usuario actualizado exitosamente:', data);

      return {
        success: true,
        data: data,
        message: data.mensaje || 'Usuario actualizado exitosamente',
      };
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }

  // Suspender un usuario (cambiar estado)
  async suspendUserInBackend(
    userId: number,
    token?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const url = `${this.apiUrl}/usuario/${userId}`;
      console.log('Suspendiendo usuario:', userId);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Agregar token de autorización
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.mensaje || 'Error al suspender el usuario',
        };
      }

      const data = await response.json();
      console.log('Usuario suspendido:', data);

      return {
        success: true,
        message: data.mensaje || 'Usuario suspendido exitosamente',
      };
    } catch (error) {
      console.error('Error al suspender usuario:', error);
      return {
        success: false,
        message: 'Error de conexión con el servidor',
      };
    }
  }
}
