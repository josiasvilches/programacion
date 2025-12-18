import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Product } from '../../../models/product.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-recommended-products-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended-products-carrousel.component.html',
  styleUrls: ['./recommended-products-carrousel.component.scss']
})
export class RecommendedProductsCarrouselComponent implements OnInit {
  products: Product[] = [];
  currentPosition = 0;
  cardWidth = 320; // 80 * 4 (w-80 + gap)
  maxScroll = 0;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscribirse a los productos de la API - solo cuando hay productos
    this.productService.apiProducts$
      .pipe(filter(products => products && products.length > 0))
      .subscribe(apiProducts => {
        console.log('Recommended products from API:', apiProducts);
        this.products = [...apiProducts]; // Crear nueva referencia para forzar detección de cambios
        this.isLoading = false;
        this.calculateMaxScroll();
        this.cdr.detectChanges(); // Forzar detección de cambios
      });

    // Timeout de seguridad: si después de 2 segundos no hay productos de la API, usar estáticos
    setTimeout(() => {
      if (this.products.length === 0) {
        console.log('Timeout: No recommended products from API, using static data');
        this.products = this.productService.getRecommendedProducts();
        this.isLoading = false;
        this.calculateMaxScroll();
        this.cdr.detectChanges(); // Forzar detección de cambios
      }
    }, 2000);
  }

  private calculateMaxScroll() {
    // Calculate max scroll based on container width - only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.maxScroll = Math.max(0, (this.products.length * this.cardWidth) - (window.innerWidth - 200));
    } else {
      // Default value for server-side rendering
      this.maxScroll = Math.max(0, (this.products.length * this.cardWidth) - 1000);
    }
  }

  scrollLeft() {
    this.currentPosition = Math.max(0, this.currentPosition - this.cardWidth);
  }

  scrollRight() {
    this.currentPosition = Math.min(this.maxScroll, this.currentPosition + this.cardWidth);
  }

  addToCart(product: Product) {
    // Verificar si el usuario está logueado
    if (!this.userService.isLoggedIn()) {
      console.log('Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/login']);
      return;
    }
    
    this.cartService.addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  }

  onImageError(event: Event, product: Product): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    
    const container = imgElement.parentElement;
    if (container && !container.querySelector('.emoji-fallback')) {
      container.innerHTML = `
        <div class="w-full h-48 bg-red-50 rounded-lg mb-4 flex items-center justify-center">
          <span class="text-6xl emoji-fallback">${product.emoji || '🍽️'}</span>
        </div>
      `;
    }
  }
}
