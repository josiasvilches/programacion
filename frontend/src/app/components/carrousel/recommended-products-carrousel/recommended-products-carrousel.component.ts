import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.interface';

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

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.products = this.productService.getRecommendedProducts();
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
    this.cartService.addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  }
}
