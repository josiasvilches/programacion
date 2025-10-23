import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-favorite-products-carrousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-products-carrousel.component.html',
  styleUrls: ['./favorite-products-carrousel.component.scss']
})
export class FavoriteProductsCarrouselComponent implements OnInit {
  products: Product[] = [];
  currentSlide = 0;
  totalSlides = 0;
  isLoading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Suscribirse a los productos de la API - solo cuando hay productos
    this.productService.apiProducts$
      .pipe(filter(products => products && products.length > 0))
      .subscribe(apiProducts => {
        console.log('Favorite products from API:', apiProducts);
        this.products = [...apiProducts.slice(0, 3)]; // Crear nueva referencia
        this.totalSlides = this.products.length;
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
      });

    // Timeout de seguridad: si después de 2 segundos no hay productos de la API, usar estáticos
    setTimeout(() => {
      if (this.products.length === 0) {
        console.log('Timeout: No favorite products from API, using static data');
        this.products = this.productService.getFeaturedProducts();
        this.totalSlides = this.products.length;
        this.isLoading = false;
        this.cdr.detectChanges(); // Forzar detección de cambios
      }
    }, 2000);
    
    this.startAutoPlay(); 
  }

  previousSlide() {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // Mostrar feedback visual o notificación
    alert(`${product.name} agregado al carrito!`);
  }

  private startAutoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}
