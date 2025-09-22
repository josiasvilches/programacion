import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';

interface ProductDetails extends Product {
  cookingTime?: string;
  servings?: string;
  prepTime?: string;
  weight?: string;
  ingredients?: string[];
  rating?: number;
  reviews?: number;
  available?: boolean;
  popular?: boolean;
}

@Component({
  selector: 'app-product',
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProduct(parseInt(id, 10));
      }
    });
  }

  private loadProduct(id: number) {
    this.isLoading.set(true);
    
    // Simular carga de producto desde el servicio
    setTimeout(() => {
      const product = this.getProductDetails(id);
      if (product) {
        this.currentProduct.set(product);
        this.loadRelatedProducts(product.category);
      } else {
        // Producto no encontrado, redirigir a comidas
        this.router.navigate(['/comidas']);
      }
      this.isLoading.set(false);
    }, 500);
  }

  private getProductDetails(id: number): ProductDetails | null {
    // Productos detallados con información adicional
    const detailedProducts: { [key: number]: ProductDetails } = {
      1: {
        id: 1,
        name: "Pollo al Spiedo Entero",
        price: 3500,
        emoji: "🍗",
        category: "Pollos",
        description: "Nuestro famoso pollo al spiedo entero, dorado a la perfección y condimentado con nuestra mezcla secreta de especias. Cocido lentamente para garantizar una carne jugosa por dentro y una piel dorada y crocante por fuera. Perfecto para compartir en familia.",
        available: true,
        popular: true,
        cookingTime: "90 minutos",
        servings: "4-6 personas",
        prepTime: "45-60 min",
        weight: "1.5 - 2 kg",
        rating: 4.8,
        reviews: 127,
        ingredients: ["Pollo entero", "Sal marina", "Pimentón", "Ajo", "Orégano", "Limón", "Especias secretas"]
      },
      2: {
        id: 2,
        name: "Medio Pollo al Spiedo",
        price: 1800,
        emoji: "🍗",
        category: "Pollos",
        description: "Media porción de nuestro famoso pollo al spiedo, ideal para 2-3 personas. Mantiene todo el sabor y la jugosidad del pollo entero en una porción más pequeña.",
        available: true,
        popular: true,
        cookingTime: "60 minutos",
        servings: "2-3 personas",
        prepTime: "30-45 min",
        weight: "0.7 - 1 kg",
        rating: 4.7,
        reviews: 89,
        ingredients: ["Medio pollo", "Sal marina", "Pimentón", "Ajo", "Orégano", "Limón", "Especias secretas"]
      },
      13: {
        id: 13,
        name: "Papas Fritas Caseras",
        price: 1200,
        emoji: "🍟",
        category: "Guarniciones",
        description: "Papas cortadas y fritas al momento, doradas y crocantes por fuera, tiernas por dentro. El acompañamiento perfecto para cualquier plato principal.",
        available: true,
        popular: true,
        cookingTime: "15 minutos",
        servings: "2-3 personas",
        prepTime: "5-10 min",
        weight: "400-500 gr",
        rating: 4.5,
        reviews: 203,
        ingredients: ["Papas frescas", "Aceite de girasol", "Sal fina"]
      },
      15: {
        id: 15,
        name: "Ensalada Mixta",
        price: 1500,
        emoji: "🥗",
        category: "Guarniciones",
        description: "Ensalada fresca con lechuga, tomate, cebolla, zanahoria y huevo duro. Aderezada con aceite de oliva y vinagre.",
        available: true,
        popular: false,
        cookingTime: "Sin cocción",
        servings: "2-3 personas",
        prepTime: "10 min",
        weight: "300-400 gr",
        rating: 4.3,
        reviews: 156,
        ingredients: ["Lechuga", "Tomate", "Cebolla", "Zanahoria", "Huevo duro", "Aceite de oliva", "Vinagre"]
      },
      19: {
        id: 19,
        name: "Coca Cola 1.5L",
        price: 800,
        emoji: "🥤",
        category: "Bebidas",
        description: "Gaseosa Coca Cola en botella de 1.5 litros, perfecta para acompañar tus comidas.",
        available: true,
        popular: true,
        servings: "4-6 vasos",
        weight: "1.5 L",
        rating: 4.9,
        reviews: 412,
        ingredients: ["Agua carbonatada", "Azúcar", "Concentrado de cola", "Ácido fosfórico", "Cafeína"]
      }
    };

    return detailedProducts[id] || null;
  }

  private loadRelatedProducts(category: string) {
    // Combinar productos del servicio con productos simulados para asegurar variedad
    const serviceProducts = this.productService.getAllProducts();
    const simulatedProducts = this.getSimulatedProductsByCategory(category);
    
    // Combinar y filtrar productos
    const allProducts = [...serviceProducts, ...simulatedProducts];
    const related = allProducts
      .filter((p: Product) => p.category === category && p.id !== this.currentProduct()?.id)
      .slice(0, 4);
    
    // Si no hay suficientes productos de la misma categoría, agregar productos populares
    if (related.length < 4) {
      const popularProducts = allProducts
        .filter((p: Product) => p.id !== this.currentProduct()?.id && !related.some(r => r.id === p.id))
        .slice(0, 4 - related.length);
      related.push(...popularProducts);
    }
    
    this.relatedProducts.set(related.slice(0, 4));
  }

  private getSimulatedProductsByCategory(category: string): Product[] {
    const productsByCategory: { [key: string]: Product[] } = {
      'Pollos': [
        {
          id: 101, name: 'Pollo a la Parrilla', description: 'Pollo marinado a la parrilla',
          price: 2800, category: 'Pollos', emoji: '🐔'
        },
        {
          id: 102, name: 'Alitas de Pollo', description: 'Alitas crujientes con salsa',
          price: 1500, category: 'Pollos', emoji: '🍗'
        },
        {
          id: 103, name: 'Pechuga Grillada', description: 'Pechuga de pollo a la plancha',
          price: 2200, category: 'Pollos', emoji: '🍖'
        }
      ],
      'Guarniciones': [
        {
          id: 201, name: 'Puré de Papas', description: 'Puré cremoso casero',
          price: 800, category: 'Guarniciones', emoji: '🥔'
        },
        {
          id: 202, name: 'Arroz Primavera', description: 'Arroz con vegetales frescos',
          price: 900, category: 'Guarniciones', emoji: '🍚'
        },
        {
          id: 203, name: 'Vegetales Grillados', description: 'Mix de vegetales a la parrilla',
          price: 1100, category: 'Guarniciones', emoji: '🥕'
        }
      ],
      'Bebidas': [
        {
          id: 301, name: 'Agua Mineral', description: 'Agua mineral sin gas 500ml',
          price: 400, category: 'Bebidas', emoji: '💧'
        },
        {
          id: 302, name: 'Jugo Natural', description: 'Jugo exprimido de naranja',
          price: 600, category: 'Bebidas', emoji: '🍊'
        },
        {
          id: 303, name: 'Gaseosa Sprite', description: 'Sprite 500ml',
          price: 700, category: 'Bebidas', emoji: '🥤'
        }
      ],
      'Principales': [
        {
          id: 401, name: 'Bife de Chorizo', description: 'Bife jugoso a la parrilla',
          price: 4500, category: 'Principales', emoji: '🥩'
        },
        {
          id: 402, name: 'Pescado a la Plancha', description: 'Filete de merluza grillado',
          price: 3200, category: 'Principales', emoji: '🐟'
        },
        {
          id: 403, name: 'Pasta Casera', description: 'Ravioles con salsa bolognesa',
          price: 2600, category: 'Principales', emoji: '🍝'
        }
      ],
      'Empanadas': [
        {
          id: 501, name: 'Empanada de Carne', description: 'Carne cortada a cuchillo',
          price: 450, category: 'Empanadas', emoji: '🥟'
        },
        {
          id: 502, name: 'Empanada de Pollo', description: 'Pollo desmenuzado con verduras',
          price: 420, category: 'Empanadas', emoji: '🥟'
        },
        {
          id: 503, name: 'Empanada de Jamón y Queso', description: 'Clásica de jamón y queso',
          price: 380, category: 'Empanadas', emoji: '🥟'
        }
      ],
      'Parrilla': [
        {
          id: 601, name: 'Chorizo Criollo', description: 'Chorizo casero a la parrilla',
          price: 1800, category: 'Parrilla', emoji: '🌭'
        },
        {
          id: 602, name: 'Morcilla Dulce', description: 'Morcilla con pasas de uva',
          price: 1600, category: 'Parrilla', emoji: '🥩'
        },
        {
          id: 603, name: 'Provoleta', description: 'Queso provolone a la parrilla',
          price: 1200, category: 'Parrilla', emoji: '🧀'
        }
      ]
    };

    return productsByCategory[category] || [];
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

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
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
}
