import { Component, OnInit, HostListener, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../enviroments/enviroments.development';

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  schedule: string;
  businessName: string;
  cuit: string;
  openingDate: string;
  businessType: string;
  description: string;
  location: string;
  memberSince: string;
}

export interface QuickStats {
  activeProducts: number;
  registeredClients: number;
  ordersThisMonth: number;
  salesThisMonth: string;
  campaignsSent: number;
}

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent, AdminSidebarComponent],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  
  // Computed para obtener información del usuario actual
  currentUser = computed(() => {
    return this.userService.user();
  });
  
  isEditModalOpen = false;
  isLoading = false;
  
  profileData: ProfileData = {
    name: 'Alejandro Cacho',
    email: 'alejandro@rotiseriacacho.com',
    phone: '+54 11 4567-8900',
    whatsapp: '+54 11 4567-8900',
    address: 'Av. Corrientes 1234, CABA, Buenos Aires',
    schedule: 'Lunes a Viernes: 11:00 - 15:00 y 19:00 - 23:30\nSábados: 11:00 - 16:00 y 19:00 - 00:00\nDomingos: 11:00 - 16:00 y 19:00 - 23:00',
    businessName: 'Rotisería Cacho',
    cuit: '20-12345678-9',
    openingDate: '2020-01-15',
    businessType: 'Rotisería y Comidas Preparadas',
    description: 'Rotisería familiar con más de 4 años de experiencia en el barrio. Especialistas en pollos al spiedo, milanesas caseras y empanadas artesanales. Nos caracterizamos por la calidad de nuestros productos y la atención personalizada a cada cliente.',
    location: 'Buenos Aires, Argentina',
    memberSince: 'Enero 2020'
  };

  editProfileData: ProfileData = { ...this.profileData };

  passwordData = {
    currentPassword: '',
    newPassword: ''
  };

  quickStats: QuickStats = {
    activeProducts: 24,
    registeredClients: 1247,
    ordersThisMonth: 342,
    salesThisMonth: '$1.245.600',
    campaignsSent: 47
  };

  // Settings toggles
  emailNotifications = true;
  pushNotifications = true;
  darkMode = false;

  constructor() {}

  ngOnInit(): void {
    // Si no hay usuario logueado, redirigir al login
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar datos completos del backend y parchar la vista
    this.loadFullProfile();
  }

  private async loadFullProfile() {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const token = this.userService.getAuthToken();
    const userId = ((currentUser as any).usuario_id) ?? currentUser.id;
    const url = `${environment.apiUrl}/usuario/${userId}`;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) {
        console.warn('No se pudieron obtener datos completos del usuario (admin):', res.status);
        return;
      }

      const data = await res.json();
      // Mapear campos básicos recibidos a profileData
      if (data.nombre) this.profileData.name = data.nombre;
      if (data.email) this.profileData.email = data.email;
      if (data.numero !== undefined && data.numero !== null) this.profileData.phone = String(data.numero);

      // Actualizar el servicio de usuario para sincronizar la app
      const updatedFields: any = {};
      if (data.nombre) updatedFields.fullName = data.nombre;
      if (data.email) updatedFields.email = data.email;
      if (data.numero !== undefined && data.numero !== null) updatedFields.phone = String(data.numero);
      this.userService.updateUser(updatedFields);

    } catch (error) {
      console.error('Error cargando perfil admin completo:', error);
    }
  }

  // Get user initials for avatar
  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return 'U';
    
    return user.initials || 'U';
  }

  // Format opening date
  getFormattedOpeningDate(): string {
    const date = new Date(this.profileData.openingDate);
    return date.toLocaleDateString('es-AR');
  }

  // Open edit modal
  openEditModal(): void {
    this.editProfileData = { ...this.profileData };
    this.passwordData = { currentPassword: '', newPassword: '' };
    this.isEditModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  // Close edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  // Handle form submission
  onSaveProfile(): void {
    this.isLoading = true;

    (async () => {
      const currentUser = this.userService.getCurrentUser();
      if (!currentUser) {
        alert('No hay usuario logueado');
        this.isLoading = false;
        return;
      }

      const token = this.userService.getAuthToken();
      const userId = ((currentUser as any).usuario_id) ?? currentUser.id;
      const url = `http://localhost:5001/usuario/${userId}`;

      // Construir payload mapeando campos a lo que espera el backend
      const payload: any = {};
      if (this.editProfileData.name !== this.profileData.name) payload.nombre = this.editProfileData.name;
      if (this.editProfileData.email !== this.profileData.email) payload.email = this.editProfileData.email;
      if (this.editProfileData.phone !== this.profileData.phone) payload.numero = this.editProfileData.phone;
      if (this.passwordData.newPassword) payload.password = this.passwordData.newPassword;

      if (Object.keys(payload).length === 0) {
        this.isLoading = false;
        this.closeEditModal();
        return;
      }

      try {
        const res = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errorMsg = 'Error al actualizar el perfil';
          try { const err = await res.json(); errorMsg = err.message || err.mensaje || errorMsg; } catch(_) {}
          alert(errorMsg);
          this.isLoading = false;
          return;
        }

        const data = await res.json();

        // Actualizar UI y servicio local
        if (payload.nombre) this.profileData.name = payload.nombre;
        if (payload.email) this.profileData.email = payload.email;
        if (payload.numero) this.profileData.phone = payload.numero;

        const updatedFields: any = {};
        if (payload.nombre) updatedFields.fullName = payload.nombre;
        if (payload.email) updatedFields.email = payload.email;
        if (payload.numero) updatedFields.phone = payload.numero;
        this.userService.updateUser(updatedFields);

        this.isLoading = false;
        this.closeEditModal();
        this.showSuccessMessage(data.message || data.mensaje || 'Perfil actualizado correctamente');

      } catch (error) {
        console.error('Error guardando perfil admin:', error);
        alert('Error de conexión. Verificá tu red y volvé a intentar.');
        this.isLoading = false;
      }
    })();
  }

  // Show success message
  showSuccessMessage(message: string): void {
    // Create success notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  // Security actions
  setup2FA(): void {
    alert('Configuración de 2FA en desarrollo');
  }

  viewActiveSessions(): void {
    alert('Vista de sesiones activas en desarrollo');
  }

  // Logout
  logout(): void {
    if (confirm('¿Estás seguro que querés cerrar sesión?')) {
      alert('Sesión cerrada exitosamente. Redirigiendo al login...');
      // Here you would redirect to login page or call authentication service
      // this.router.navigate(['/login']);
    }
  }

  // Toggle settings
  toggleEmailNotifications(): void {
    this.emailNotifications = !this.emailNotifications;
  }

  togglePushNotifications(): void {
    this.pushNotifications = !this.pushNotifications;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

  // Close modal when pressing Escape key
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isEditModalOpen) {
      this.closeEditModal();
    }
  }
}
