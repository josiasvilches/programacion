import { Component, HostListener, OnInit, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { UserService, User } from '../../services/user.service';

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
  @Input() showNavLinks: boolean = false;
  
  private userService = inject(UserService);
  
  isDropdownOpen = false;
  isMobileMenuOpen = false;
  cartItemsCount = 0;

  // Usar el servicio para obtener el usuario actual
  user = computed(() => this.userService.user());
  
  // Computed para obtener las notificaciones (hardcodeado por ahora)
  notifications = computed(() => 3);

  // Getter para verificar si hay usuario logueado
  get isUserLoggedIn(): boolean {
    return this.user() !== null;
  }

  // Getter para verificar si el usuario puede acceder al panel de administración
  get canAccessAdminPanel(): boolean {
    const currentUser = this.user();
    return currentUser ? (currentUser.role === 'ADMIN' || currentUser.role === 'EMPLOYER') : false;
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
    this.userService.logout();
    this.closeMobileMenu();
    console.log('Usuario deslogueado');
  }
}
