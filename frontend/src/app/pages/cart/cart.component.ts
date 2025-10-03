import { Component, signal, computed, inject, OnInit, AfterViewInit } from '@angular/core';
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
export class CartComponent implements OnInit, AfterViewInit {
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

  // Método helper para scroll al top
  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  ngOnInit() {
    this.scrollToTop();
    this.loadCartItems();
  }

  ngAfterViewInit() {
    // Doble verificación después de que la vista esté completamente inicializada
    setTimeout(() => {
      this.scrollToTop();
    }, 100);
  }

  private loadCartItems() {
    // Simular carga de items del carrito desde el servicio
    // En una aplicación real, esto vendría del CartService
    const mockCartItems: ExtendedCartItem[] = [
      {
        product: {
          id: 1,
          name: "Pollo al Spiedo Entero",
          description: "Pollo entero dorado al spiedo",
          price: 3500,
          category: "Pollos",
          emoji: "🍗"
        },
        quantity: 1,
        available: true,
        category: "Pollos"
      },
      {
        product: {
          id: 4,
          name: "Milanesas de Pollo (4 unidades)",
          description: "Milanesas crocantes de pollo",
          price: 2800,
          category: "Milanesas",
          emoji: "🍖"
        },
        quantity: 2,
        available: true,
        category: "Milanesas"
      },
      {
        product: {
          id: 7,
          name: "Empanadas de Carne (6 unidades)",
          description: "Empanadas caseras de carne",
          price: 2700,
          category: "Empanadas",
          emoji: "🥟"
        },
        quantity: 1,
        available: true,
        category: "Empanadas"
      },
      {
        product: {
          id: 13,
          name: "Matambre a la Pizza",
          description: "Matambre con salsa y queso",
          price: 5200,
          category: "Carnes",
          emoji: "🍕"
        },
        quantity: 1,
        available: false,
        category: "Carnes"
      }
    ];

    this.cartItems.set(mockCartItems);
  }

  increaseQuantity(itemId: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.product.id === itemId && item.quantity < 10) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  decreaseQuantity(itemId: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.product.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
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
    this.cartItems.update(items => {
      return items.filter(item => item.product.id !== itemId);
    });
  }

  showClearCartConfirmation() {
    if (this.cartItems().length === 0) return;
    
    this.pendingAction.set(() => this.clearCart());
    this.modalTitle.set('Vaciar carrito');
    this.modalMessage.set('¿Estás seguro que querés eliminar todos los productos del carrito?');
    this.showConfirmationModal.set(true);
  }

  clearCart() {
    this.cartItems.set([]);
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
