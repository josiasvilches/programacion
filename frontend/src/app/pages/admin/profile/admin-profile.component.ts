import { Component, OnInit, HostListener, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { UserService } from '../../../services/user.service';

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
    // Initialize component
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

    // Simulate API call
    setTimeout(() => {
      // Update profile data
      this.profileData = { ...this.editProfileData };
      
      // Handle password change if provided
      if (this.passwordData.currentPassword && this.passwordData.newPassword) {
        console.log('Password change requested');
        // Aquí se haría la llamada al backend para cambiar la contraseña
      }
      
      this.isLoading = false;
      this.closeEditModal();
      
      // Show success message based on what was updated
      let message = '¡Perfil actualizado exitosamente!';
      if (this.passwordData.currentPassword && this.passwordData.newPassword) {
        message = '¡Perfil y contraseña actualizados exitosamente!';
      }
      this.showSuccessMessage(message);
    }, 1500);
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
