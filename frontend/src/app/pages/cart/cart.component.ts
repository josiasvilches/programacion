import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface ExtendedCartItem extends CartItem {
  available: boolean;
  category: string;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);

  // Signals
  cartItems = signal<ExtendedCartItem[]>([]);
  showConfirmationModal = signal<boolean>(false);
  pendingAction = signal<(() => void) | null>(null);
  modalTitle = signal<string>('');
  modalMessage = signal<string>('');

  // Computed values
  totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  availableItems = computed(() => {
    return this.cartItems().filter(item => item.available);
  });

  subtotal = computed(() => {
    return this.availableItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  shippingCost = computed(() => {
    return this.subtotal() >= 3000 ? 0 : 500;
  });

  total = computed(() => {
    return this.subtotal();
  });

  formattedSubtotal = computed(() => {
    return `$${this.subtotal().toLocaleString()}`;
  });

  formattedTotal = computed(() => {
    return `$${this.total().toLocaleString()}`;
  });

  formattedShipping = computed(() => {
    return this.shippingCost() === 0 ? 'Gratis' : `$${this.shippingCost().toLocaleString()}`;
  });

  shippingClass = computed(() => {
    return this.shippingCost() === 0 ? 'text-green-600 font-medium' : 'text-gray-600';
  });

  canCheckout = computed(() => {
    return this.availableItems().length > 0;
  });

  isCartEmpty = computed(() => {
    return this.cartItems().length === 0;
  });

  ngOnInit() {
    this.loadCartItems();
  }

  private loadCartItems() {
    // Suscribirse al servicio de carrito para obtener los items reales
    this.cartService.cartItems$.subscribe(items => {
      // Convertir CartItem a ExtendedCartItem
      const extendedItems: ExtendedCartItem[] = items.map(item => ({
        ...item,
        available: true, // Por defecto todos están disponibles
        category: item.product.category || 'Sin categoría'
      }));
      
      this.cartItems.set(extendedItems);
    });
  }

  increaseQuantity(itemId: number) {
    const item = this.cartItems().find(item => item.product.id === itemId);
    if (item && item.quantity < 10) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: number) {
    const item = this.cartItems().find(item => item.product.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  showRemoveConfirmation(itemId: number) {
    const item = this.cartItems().find(item => item.product.id === itemId);
    if (item) {
      this.pendingAction.set(() => this.removeItem(itemId));
      this.modalTitle.set('Eliminar producto');
      this.modalMessage.set(`¿Estás seguro que querés eliminar "${item.product.name}" del carrito?`);
      this.showConfirmationModal.set(true);
    }
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  showClearCartConfirmation() {
    if (this.cartItems().length === 0) return;
    
    this.pendingAction.set(() => this.clearCart());
    this.modalTitle.set('Vaciar carrito');
    this.modalMessage.set('¿Estás seguro que querés eliminar todos los productos del carrito?');
    this.showConfirmationModal.set(true);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  closeModal() {
    this.showConfirmationModal.set(false);
    this.pendingAction.set(null);
  }

  confirmAction() {
    const action = this.pendingAction();
    if (action) {
      action();
      this.pendingAction.set(null);
    }
    this.closeModal();
  }

  proceedToCheckout() {
    const availableItems = this.availableItems();
    if (availableItems.length === 0) return;
    
    // Navegar a la página de pago
    this.router.navigate(['/payment']);
  }

  continueShopping() {
    this.router.navigate(['/comidas']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  formatPrice(price: number): string {
    return `$${price.toLocaleString()}`;
  }

  getItemTotal(item: ExtendedCartItem): string {
    return this.formatPrice(item.product.price * item.quantity);
  }
}
