import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

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

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products = this.productService.getFeaturedProducts();
    this.totalSlides = this.products.length;
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
