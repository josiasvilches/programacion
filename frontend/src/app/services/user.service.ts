import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  initials?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Usuarios predefinidos para testing
  private testUsers: User[] = [
    {
      id: 1,
      fullName: 'Juan Carlos Pérez',
      email: 'juan.perez@email.com',
      role: 'Cliente',
      status: 'Activo'
    },
    {
      id: 2,
      fullName: 'María García López',
      email: 'maria.garcia@admin.com',
      role: 'admin',
      status: 'Activo'
    },
    {
      id: 3,
      fullName: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@empleado.com',
      role: 'empleado',
      status: 'Activo'
    },
    {
      id: 4,
      fullName: 'Ana Sofía Martínez',
      email: 'ana.martinez@cliente.com',
      role: 'Cliente',
      status: 'Activo'
    }
  ];

  // Signal para el usuario actual - empezamos con el cliente
  private currentUser = signal<User | null>(this.testUsers[0]);

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

  // Métodos específicos para cambiar a diferentes tipos de usuarios
  loginAsAdmin() {
    const admin = this.testUsers.find(u => u.role === 'admin');
    if (admin) {
      this.currentUser.set(admin);
      console.log('Cambiado a usuario administrador:', admin.fullName);
    }
  }

  loginAsEmployee() {
    const employee = this.testUsers.find(u => u.role === 'empleado');
    if (employee) {
      this.currentUser.set(employee);
      console.log('Cambiado a usuario empleado:', employee.fullName);
    }
  }

  loginAsClient() {
    const client = this.testUsers.find(u => u.role === 'Cliente');
    if (client) {
      this.currentUser.set(client);
      console.log('Cambiado a usuario cliente:', client.fullName);
    }
  }

  // Método para obtener todos los usuarios disponibles
  getAvailableUsers() {
    return this.testUsers;
  }

  // Método para hacer login por ID
  loginAsUser(userId: number) {
    const user = this.testUsers.find(u => u.id === userId);
    if (user) {
      this.currentUser.set(user);
      console.log('Cambiado a usuario:', user.fullName, '- Rol:', user.role);
    }
  }

  // Método para logout
  logout() {
    this.currentUser.set(null);
    console.log('Usuario deslogueado');
  }
}