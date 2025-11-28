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
  weight?: string;
  ingredients?: string[];
  rating?: number;
  reviews?: number;
  available?: boolean;
  popular?: boolean;
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

  ngOnInit() {
    console.log('=== ProductComponent inicializado ===');
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID recibido de la ruta:', id);
      if (id) {
        this.loadProductFromAPI(parseInt(id, 10));
      } else {
        console.error('No se recibió ID en la ruta');
        this.router.navigate(['/comidas']);
      }
    });
  }

  private async loadProductFromAPI(id: number) {
    this.isLoading.set(true);
    
    try {
      // Llamar a la API para obtener el producto
      const apiProduct = await this.productService.fetchProductById(id);
      
      if (apiProduct) {
        // Convertir el producto de la API a ProductDetails con información adicional
        const productDetails: ProductDetails = {
          ...apiProduct,
          cookingTime: "30-45 min",
          servings: "2-3 personas",
          prepTime: "25-35 min",
          weight: "500-700 gr",
          ingredients: ["Ingredientes frescos", "Preparación casera"],
          rating: 4.5,
          reviews: 50,
          available: true,
          popular: false
        };
        
        this.currentProduct.set(productDetails);
        console.log('Producto cargado desde API:', productDetails);
        
        // Cargar productos relacionados usando id_categoria si existe, sino usar category
        if (productDetails.id_categoria) {
          this.loadRelatedProducts(productDetails.id_categoria.toString());
        } else if (productDetails.category) {
          this.loadRelatedProducts(productDetails.category);
        }
      } else {
        console.error('Producto no encontrado en API');
        // Si no se encuentra en API, usar método fallback
        this.loadProductFallback(id);
      }
    } catch (error) {
      console.error('Error cargando producto desde API:', error);
      // En caso de error, usar método fallback
      this.loadProductFallback(id);
    }
    
    this.isLoading.set(false);
  }

  private loadProductFallback(id: number) {
    // Método fallback que usa los datos hardcodeados
    const product = this.getProductDetails(id);
    if (product) {
      this.currentProduct.set(product);
      this.loadRelatedProducts(product.category);
    } else {
      // Producto no encontrado, redirigir a comidas
      this.router.navigate(['/comidas']);
    }
  }

  private getProductDetails(id: number): ProductDetails | null {
    // Productos detallados con información adicional
    const detailedProducts: { [key: number]: ProductDetails } = {
      1: {
        id: 1,
        name: "Pollo al Spiedo Entero",
        price: 3500,
        emoji: "🍗",
        category: "pollos",
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
        category: "pollos",
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
      3: {
        id: 3,
        name: "Cuarto de Pollo",
        price: 950,
        emoji: "🍗",
        category: "pollos",
        description: "Cuarto de pollo jugoso con piel dorada, perfecto para una porción individual. Cocido al spiedo con las mismas especias que nuestro pollo entero.",
        available: true,
        popular: false,
        cookingTime: "45 minutos",
        servings: "1-2 personas",
        prepTime: "20-30 min",
        weight: "0.3 - 0.5 kg",
        rating: 4.5,
        reviews: 64,
        ingredients: ["Cuarto de pollo", "Sal marina", "Pimentón", "Ajo", "Orégano", "Limón", "Especias secretas"]
      },
      4: {
        id: 4,
        name: "Milanesas de Pollo",
        price: 2800,
        emoji: "🍗",
        category: "milanesas",
        description: "Milanesas de pollo caseras, tiernas y doradas. Preparadas con pechuga de pollo fresca, rebozadas con pan rallado casero y doradas hasta obtener la textura perfecta.",
        available: true,
        popular: true,
        cookingTime: "20 minutos",
        servings: "3-4 personas",
        prepTime: "25-35 min",
        weight: "600-800 gr",
        rating: 4.6,
        reviews: 156,
        ingredients: ["Pechuga de pollo", "Pan rallado", "Huevo", "Harina", "Sal", "Pimienta", "Aceite"]
      },
      5: {
        id: 5,
        name: "Milanesas de Carne",
        price: 3200,
        emoji: "🥩",
        category: "milanesas",
        description: "Milanesas de carne vacuna premium, jugosas y sabrosas. Preparadas con nalga de primera calidad, tiernizadas y rebozadas al momento.",
        available: true,
        popular: true,
        cookingTime: "25 minutos",
        servings: "3-4 personas",
        prepTime: "30-40 min",
        weight: "700-900 gr",
        rating: 4.7,
        reviews: 198,
        ingredients: ["Nalga de ternera", "Pan rallado", "Huevo", "Harina", "Sal", "Pimienta", "Aceite"]
      },
      6: {
        id: 6,
        name: "Milanesas Napolitanas",
        price: 3800,
        emoji: "🍕",
        category: "milanesas",
        description: "Milanesas de carne cubiertas con jamón cocido, queso mozzarella y salsa de tomate casera. Un clásico irresistible que combina lo mejor de dos mundos.",
        available: false,
        popular: true,
        cookingTime: "35 minutos",
        servings: "3-4 personas",
        prepTime: "35-45 min",
        weight: "800-1000 gr",
        rating: 4.8,
        reviews: 234,
        ingredients: ["Milanesa de carne", "Jamón cocido", "Queso mozzarella", "Salsa de tomate", "Orégano"]
      },
      7: {
        id: 7,
        name: "Empanadas de Carne (6 unidades)",
        price: 2700,
        emoji: "🥟",
        category: "empanadas",
        description: "Empanadas caseras rellenas de carne cortada a cuchillo, cebolla, huevo duro y aceitunas. Masa casera y cocción al horno para una textura perfecta.",
        available: true,
        popular: true,
        cookingTime: "25 minutos",
        servings: "2-3 personas",
        prepTime: "20-30 min",
        weight: "600-700 gr",
        rating: 4.9,
        reviews: 312,
        ingredients: ["Carne vacuna", "Cebolla", "Huevo duro", "Aceitunas", "Pimentón", "Comino", "Masa casera"]
      },
      8: {
        id: 8,
        name: "Empanadas de Pollo (6 unidades)",
        price: 2500,
        emoji: "🥟",
        category: "empanadas",
        description: "Empanadas de pollo desmenuzado cocinado con verduras frescas y condimentos especiales. Una opción más liviana pero igualmente sabrosa.",
        available: true,
        popular: false,
        cookingTime: "25 minutos",
        servings: "2-3 personas",
        prepTime: "20-30 min",
        weight: "550-650 gr",
        rating: 4.4,
        reviews: 87,
        ingredients: ["Pollo desmenuzado", "Cebolla", "Pimiento", "Zanahoria", "Caldo", "Masa casera"]
      },
      9: {
        id: 9,
        name: "Empanadas de Jamón y Queso (6 unidades)",
        price: 2400,
        emoji: "🥟",
        category: "empanadas",
        description: "Empanadas clásicas de jamón cocido y queso cremoso. Un sabor tradicional que gusta a toda la familia, especialmente a los más pequeños.",
        available: true,
        popular: false,
        cookingTime: "20 minutos",
        servings: "2-3 personas",
        prepTime: "20-30 min",
        weight: "500-600 gr",
        rating: 4.3,
        reviews: 145,
        ingredients: ["Jamón cocido", "Queso cremoso", "Cebolla", "Masa casera"]
      },
      10: {
        id: 10,
        name: "Empanadas de Verdura (6 unidades)",
        price: 2200,
        emoji: "🥟",
        category: "empanadas",
        description: "Empanadas vegetarianas con acelga fresca, cebolla dorada y queso. Una opción saludable y sabrosa para los amantes de las verduras.",
        available: true,
        popular: false,
        cookingTime: "25 minutos",
        servings: "2-3 personas",
        prepTime: "20-30 min",
        weight: "450-550 gr",
        rating: 4.2,
        reviews: 76,
        ingredients: ["Acelga", "Cebolla", "Queso", "Huevo", "Masa casera"]
      },
      11: {
        id: 11,
        name: "Bife de Chorizo",
        price: 4500,
        emoji: "🥩",
        category: "carnes",
        description: "Bife de chorizo premium, jugoso y tierno, cocido a la parrilla al punto que prefieras. Corte de primera calidad que se deshace en la boca.",
        available: true,
        popular: true,
        cookingTime: "15 minutos",
        servings: "1 persona",
        prepTime: "15-25 min",
        weight: "250-300 gr",
        rating: 4.8,
        reviews: 267,
        ingredients: ["Bife de chorizo", "Sal gruesa", "Pimienta negra", "Chimichurri"]
      },
      12: {
        id: 12,
        name: "Asado de Tira",
        price: 3800,
        emoji: "🥩",
        category: "carnes",
        description: "Asado de tira tierno con hueso, cocido lentamente a la parrilla. Un corte tradicional argentino que conserva todo su sabor y jugosidad.",
        available: true,
        popular: false,
        cookingTime: "60 minutos",
        servings: "2-3 personas",
        prepTime: "40-60 min",
        weight: "800-1000 gr",
        rating: 4.6,
        reviews: 123,
        ingredients: ["Asado de tira", "Sal gruesa", "Pimienta", "Chimichurri"]
      },
      13: {
        id: 13,
        name: "Matambre a la Pizza",
        price: 5200,
        emoji: "🍕",
        category: "carnes",
        description: "Matambre relleno con jamón cocido, queso mozzarella y salsa de tomate casera, cocido al horno. Una preparación especial que combina la tradición argentina con sabores italianos.",
        available: false,
        popular: true,
        cookingTime: "90 minutos",
        servings: "4-6 personas",
        prepTime: "60-90 min",
        weight: "1.2-1.5 kg",
        rating: 4.9,
        reviews: 89,
        ingredients: ["Matambre", "Jamón cocido", "Queso mozzarella", "Salsa de tomate", "Orégano", "Aceitunas"]
      },
      14: {
        id: 14,
        name: "Pollo Grillé",
        price: 2800,
        emoji: "🍗",
        category: "pollos",
        description: "Pollo marinado con hierbas frescas y especias, grillado a la perfección. Una preparación más liviana que conserva toda la jugosidad y el sabor del pollo.",
        available: true,
        popular: false,
        cookingTime: "45 minutos",
        servings: "2-3 personas",
        prepTime: "35-45 min",
        weight: "1-1.3 kg",
        rating: 4.4,
        reviews: 67,
        ingredients: ["Pollo entero", "Hierbas frescas", "Ajo", "Limón", "Aceite de oliva", "Sal marina", "Pimienta"]
      }
    };

    return detailedProducts[id] || null;
  }

  private async loadRelatedProducts(category: string) {
    try {
      const currentProduct = this.currentProduct();
      
      if (!currentProduct || !currentProduct.id_categoria) {
        console.log('No hay id_categoria disponible');
        this.relatedProducts.set([]);
        return;
      }
      
      const categoryId = currentProduct.id_categoria;
      console.log(`Cargando productos relacionados de categoría ${categoryId}`);
      
      // Hacer fetch con id_categoria y per_page=5 (por si viene el producto actual)
      await this.productService.fetchProducts({
        id_categoria: categoryId,
        per_page: 5,
        page: 1
      });
      
      // Esperar un momento para que el Observable se actualice
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Obtener los productos actuales del servicio
      const products = this.productService.getCurrentApiProducts();
      console.log('Productos obtenidos del backend:', products.length, products);
      
      // Filtrar el producto actual (por si viene incluido) y limitar a 4
      const filtered = products
        .filter(p => p.id !== currentProduct.id)
        .slice(0, 4);
        
      console.log('Productos relacionados después de filtrar:', filtered.length, filtered);
      this.relatedProducts.set(filtered);
      
    } catch (error) {
      console.error('Error cargando productos relacionados:', error);
      this.relatedProducts.set([]);
    }
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
    // Cambiar de /comidas/:id a /product/:id
    this.router.navigate(['/product', productId]);
    
    // Recargar el componente con el nuevo producto
    window.scrollTo(0, 0);
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
