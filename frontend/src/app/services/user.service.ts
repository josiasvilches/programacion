import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
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
  providedIn: 'root'
})
export class UserService {
  // Signal para el usuario actual
  private currentUser = signal<User | null>(null);
  
  // Signal para el estado de autenticación
  private isAuthenticated = signal<boolean>(false);
  
  // Signal para el estado de carga
  private isLoading = signal<boolean>(false);

  // Usuarios predefinidos para testing/fallback
  private testUsers: User[] = [
    {
      id: 1,
      fullName: 'Juan Carlos Pérez',
      email: 'juan.perez@email.com',
      phone: '+54 11 1234-5678',
      role: 'Cliente',
      status: 'Activo'
    },
    {
      id: 2,
      fullName: 'María García López',
      email: 'maria.garcia@admin.com',
      phone: '+54 11 2345-6789',
      role: 'Admin',
      status: 'Activo'
    },
    {
      id: 3,
      fullName: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@empleado.com',
      phone: '+54 11 3456-7890',
      role: 'Empleado',
      status: 'Activo'
    },
    {
      id: 4,
      fullName: 'Ana Sofía Martínez',
      email: 'ana.martinez@cliente.com',
      phone: '+54 11 4567-8901',
      role: 'Cliente',
      status: 'Activo'
    }
  ];

  constructor() {
    // Verificar si hay un token almacenado al inicializar
    if (this.isBrowser()) {
      this.checkStoredToken();
    }
  }

  // Verificar si estamos en el navegador (no en SSR)
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
      initials: this.userInitials()
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
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de login:', errorData);
        return { 
          success: false, 
          message: errorData.mensaje || 'Error de autenticación'
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
        message: data.mensaje || 'Login exitoso'
      };

    } catch (error) {
      console.error('Error en login:', error);
      return { 
        success: false, 
        message: 'Error de conexión con el servidor'
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
        loginTime: new Date().toISOString()
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
        role: loginResponse.rol || 'USER',
        status: 'Activo'
      };
    } catch (error) {
      console.error('Error decodificando token:', error);
      return {
        id: 0,
        fullName: 'Usuario',
        email: '',
        role: loginResponse.rol || 'USER',
        status: 'Activo'
      };
    }
  }

  // Verificar si hay un token almacenado al inicializar
  private checkStoredToken() {
    if (!this.isBrowser()) {
      return; // No hacer nada en SSR
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
            role: payload.rol || userInfo?.rol || 'USER',
            status: 'Activo'
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
  hasRole(role: string): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === role;
  }

  // Método para obtener todos los datos almacenados del usuario
  getStoredUserData(): { user: User | null; userInfo: any; token: string | null } {
    return {
      user: this.getCurrentUser(),
      userInfo: this.getUserInfo(),
      token: this.getAuthToken()
    };
  }

  // Método para hacer llamadas autenticadas
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAccessToken();
    
    const authOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    return fetch(url, authOptions);
  }

  // Método para actualizar el usuario (simula login/cambio de usuario)
  updateUser(userData: Partial<User>) {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({
        ...current,
        ...userData
      });
    }
  }

  // Método para simular diferentes usuarios (para testing)
  switchToUser(userData: User) {
    this.currentUser.set(userData);
  }

  // Método para obtener el usuario actual
  getCurrentUser() {
    return this.currentUser();
  }

  // Métodos específicos para cambiar a diferentes tipos de usuarios (para testing)
  loginAsAdmin() {
    const admin = this.testUsers.find(u => u.role === 'Admin');
    if (admin) {
      this.currentUser.set(admin);
      this.isAuthenticated.set(true);
      console.log('Cambiado a usuario administrador:', admin.fullName);
    }
  }

  loginAsEmployee() {
    const employee = this.testUsers.find(u => u.role === 'Empleado');
    if (employee) {
      this.currentUser.set(employee);
      this.isAuthenticated.set(true);
      console.log('Cambiado a usuario empleado:', employee.fullName);
    }
  }

  loginAsClient() {
    const client = this.testUsers.find(u => u.role === 'Cliente');
    if (client) {
      this.currentUser.set(client);
      this.isAuthenticated.set(true);
      console.log('Cambiado a usuario cliente:', client.fullName);
    }
  }

  // Método para obtener todos los usuarios disponibles
  getAvailableUsers() {
    return this.testUsers;
  }

  // Método para hacer login por ID (testing)
  loginAsUser(userId: number) {
    const user = this.testUsers.find(u => u.id === userId);
    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      console.log('Cambiado a usuario:', user.fullName, '- Rol:', user.role);
    }
  }

  // Método para hacer logout
  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.clearTokens();
    console.log('Usuario deslogueado');
  }
}