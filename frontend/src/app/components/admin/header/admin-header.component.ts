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
  adminUser = computed(() => {
    const user = this.userService.user();
    if (!user) {
      return {
        name: 'Usuario',
        initials: 'U',
        role: 'Usuario'
      };
    }
    
    return {
      name: user.role, // Mostrar el rol como nombre
      initials: user.initials || 'U',
      role: user.role
    };
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
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
    // TODO: Implementar lógica de cerrar sesión
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      console.log('Cerrando sesión...');
      // Aquí iría la lógica de logout
      this.closeUserDropdown();
    }
  }
}
