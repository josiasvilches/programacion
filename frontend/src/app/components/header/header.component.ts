import { Component, HostListener, OnInit, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showUserMenu: boolean = true;
  @Input() showCart: boolean = true;
  
  private userService = inject(UserService);
  
  isDropdownOpen = false;
  isMobileMenuOpen = false;
  cartItemsCount = 0;

<<<<<<< HEAD
  // Usuario hardcodeado - cambiar a null para simular usuario no logueado
  user = {
    name: 'Juan Díaz',
    initials: 'JD',
    notifications: 3,
    // role: 'cliente' // Puede ser 'admin', 'empleado', 'cliente'
    role: 'empleado' // Puede ser 'admin', 'empleado', 'cliente'
  };
  // Para probar sin usuario logueado, cambiar a: user = null;
=======
  // Usuario desde el servicio
  user = computed(() => {
    const userData = this.userService.user();
    if (!userData) return null;
    
    return {
      name: userData.fullName,
      initials: userData.initials,
      notifications: 3,
      role: userData.role // Usar el rol real del usuario, no siempre 'cliente'
    };
  });
>>>>>>> 1b2a851c4bd461673dbb636889abf9759d21b803

  // Getter para verificar si hay usuario logueado
  get isUserLoggedIn(): boolean {
    return this.user() !== null;
  }

    // Getter para verificar si el usuario puede acceder al panel de administración
  get canAccessAdminPanel(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser ? (currentUser.role === 'Admin' || currentUser.role === 'Empleado') : false;
  }

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemsCount = this.cartService.getCartItemsCount();
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown')) {
      this.isDropdownOpen = false;
    }
    if (!target.closest('.mobile-menu-container')) {
      this.isMobileMenuOpen = false;
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onOrderNow() {
    this.scrollToSection('menu');
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

  onOrdersClick() {
    this.router.navigate(['/orders']);
  }

  onAdminPanelClick() {
    this.router.navigate(['/admin']);
    this.isDropdownOpen = false;
    this.closeMobileMenu();
  }

  onLogout() {
    console.log('Logout user');
    this.closeMobileMenu();
  }
}
