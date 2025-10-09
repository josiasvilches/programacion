import { Component, Input, OnInit, OnDestroy, HostListener, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Input() title: string = 'Panel Administrativo';
  @Input() subtitle: string = 'Gestiona tu rotisería';
  
  private userService = inject(UserService);
  
  currentTime: string = '';
  isUserDropdownOpen = false;
  
  // Computed para obtener información del usuario actual
  user = computed(() => this.userService.user());
  
  // Computed para verificar si hay usuario logueado
  isUserLoggedIn = computed(() => this.user() !== null);
  
  // Computed para obtener información de display del usuario
  adminUser = computed(() => {
    const currentUser = this.user();
    if (!currentUser) {
      return {
        name: 'Usuario',
        initials: 'U',
        role: 'Usuario',
        email: ''
      };
    }
    
    return {
      name: currentUser.fullName || 'Usuario',
      initials: currentUser.initials || 'U',
      role: this.getRoleDisplayName(currentUser.role),
      email: currentUser.email || ''
    };
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  // Método para obtener el nombre de display del rol
  private getRoleDisplayName(role: string): string {
    const roleNames = {
      'ADMIN': 'Administrador',
      'USER': 'Usuario',
      'EMPLOYER': 'Empleado'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Cerrar dropdown si se hace clic fuera de él
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isUserDropdownOpen = false;
    }
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  closeUserDropdown() {
    this.isUserDropdownOpen = false;
  }

  goToProfile() {
    this.router.navigate(['/admin/profile']);
    this.closeUserDropdown();
  }

  goToWebsite() {
    // Abrir la página web en una nueva pestaña
    window.open('/', '_blank');
    this.closeUserDropdown();
  }

  logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.userService.logout();
      this.closeUserDropdown();
      this.router.navigate(['/']);
    }
  }
}
