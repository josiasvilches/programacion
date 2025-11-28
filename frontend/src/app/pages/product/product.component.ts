import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface ProductDetails extends Product {
  id_categoria?: number;
  cookingTime?: string;
  servings?: string;
  prepTime?: string;
  portions?: string;
  weight?: string;
  ingredients?: string[];
  rating?: number;
  reviews?: number;
  available?: boolean;
  popular?: boolean;
  imageUrl?: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Signals
  currentProduct = signal<ProductDetails | null>(null);
  relatedProducts = signal<Product[]>([]);
  quantity = signal<number>(1);
  isLoading = signal<boolean>(true);
  showSuccessModal = signal<boolean>(false);

  // Computed values
  totalPrice = computed(() => {
    const product = this.currentProduct();
    return product ? product.price * this.quantity() : 0;
  });

  formattedPrice = computed(() => {
    const product = this.currentProduct();
    return product ? `$${product.price.toLocaleString()}` : '';
  });

  formattedTotalPrice = computed(() => {
    return `$${this.totalPrice().toLocaleString()}`;
  });

  breadcrumbName = computed(() => {
    return this.currentProduct()?.name || 'Producto';
  });

  availabilityStatus = computed(() => {
    const product = this.currentProduct();
    if (!product) return { text: 'Cargando...', class: 'bg-gray-100 text-gray-600' };
    
    return product.available 
      ? { text: 'Disponible', class: 'bg-green-100 text-green-600' }
      : { text: 'Agotado', class: 'bg-red-100 text-red-600' };
  });

  isAddToCartDisabled = computed(() => {
    const product = this.currentProduct();
    return !product || !product.available || this.isLoading();
  });

  ngOnInit(): void {
    console.log('ProductComponent inicializado');
    
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.route.params.subscribe(params => {
      console.log('Parámetros de ruta recibidos:', params);
      const productId = params['id'];
      if (productId) {
        console.log('Cargando producto con ID:', productId);
        this.loadProduct(Number(productId));
      } else {
        console.error('No se recibió ID de producto');
      }
    });
  }

  private loadProduct(id: number): void {
    console.log('loadProduct llamado con ID:', id);
    this.isLoading.set(true);
    
    // También hacer scroll al inicio al cargar un nuevo producto
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.productService.getProductById(id).subscribe({
      next: (response: any) => {
        console.log('Producto recibido del backend:', response);
        
        const mappedProduct: ProductDetails = {
          id: response.producto_id,
          name: response.nombre,
          price: response.precio,
          description: response.descripcion || 'Delicioso producto de nuestra rotisería',
          category: response.categoria || 'comida',
          available: response.disponible,
          imageUrl: response.imagen_url,
          emoji: this.getEmojiForProduct(response),
          rating: 4.5,
          reviews: 0,
          prepTime: '30-45 min',
          portions: '2-3 personas'
        };
        
        this.currentProduct.set(mappedProduct);
        this.loadRelatedProducts(mappedProduct.category);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error al cargar producto:', error);
        this.currentProduct.set(null);
        this.isLoading.set(false);
      }
    });
  }

  private getEmojiForProduct(product: any): string {
    const nombre = product.nombre?.toLowerCase() || '';
    
    if (nombre.includes('pollo')) return '🍗';
    if (nombre.includes('pizza')) return '🍕';
    if (nombre.includes('hamburguesa')) return '🍔';
    if (nombre.includes('pasta') || nombre.includes('fideos')) return '🍝';
    if (nombre.includes('empanada')) return '🥟';
    if (nombre.includes('milanesa')) return '🍖';
    if (nombre.includes('carne') || nombre.includes('asado')) return '🥩';
    if (nombre.includes('ensalada')) return '🥗';
    if (nombre.includes('sandwich')) return '🥪';
    if (nombre.includes('tarta')) return '🥧';
    
    return '🍽️';
  }

  private async loadRelatedProducts(category: string): Promise<void> {
    try {
      const params = { id_categoria: this.getCategoryId(category), per_page: 5 };
      const response: any = await this.productService.fetchProducts(params);
      
      const products = response.productos || [];
      const related = products
        .filter((p: any) => p.producto_id !== this.currentProduct()?.id)
        .slice(0, 4)
        .map((p: any) => ({
          id: p.producto_id,
          name: p.nombre,
          price: p.precio,
          emoji: this.getEmojiForProduct(p),
          category: p.categoria || 'comida'
        }));
      this.relatedProducts.set(related);
    } catch (error: any) {
      console.error('Error al cargar productos relacionados:', error);
    }
  }

  private getCategoryId(category: string): number {
    const categoryMap: { [key: string]: number } = {
      'comida': 1,
      'bebida': 2,
      'postre': 3,
      'entrada': 4
    };
    return categoryMap[category] || 1;
  }

  viewProduct(productId: number): void {
    this.loadProduct(productId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  increaseQuantity() {
    if (this.quantity() < 10) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update(q => q - 1);
    }
  }

  updateQuantity(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = parseInt(target.value, 10);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }
    
    this.quantity.set(value);
    target.value = value.toString();
  }

  addToCart() {
    const product = this.currentProduct();
    if (!product || !product.available) return;

    this.cartService.addToCart(product, this.quantity());
    this.showSuccessModal.set(true);
  }

  buyNow() {
    this.addToCart();
    setTimeout(() => {
      this.closeSuccessModal();
      this.router.navigate(['/cart']);
    }, 1000);
  }

  addToFavorites() {
    const product = this.currentProduct();
    if (product) {
      alert(`${product.name} agregado a favoritos`);
    }
  }

  closeSuccessModal() {
    this.showSuccessModal.set(false);
  }

  viewCart() {
    this.closeSuccessModal();
    this.router.navigate(['/cart']);
  }

  goToProducts() {
    this.router.navigate(['/comidas']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    return stars;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    const product = this.currentProduct();
    if (product) {
      // Si falla la carga de la imagen, no hacer nada (se mostrará el emoji automáticamente)
      console.warn('Error al cargar imagen del producto:', product.imageUrl);
      imgElement.style.display = 'none';
    }
  }
}
