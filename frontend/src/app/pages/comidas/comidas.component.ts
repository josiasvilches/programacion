import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

interface ExtendedProduct extends Product {
  available: boolean;
  popular: boolean;
  new: boolean;
  prepTime: string;
  portions: string;
}

interface CategoryInfo {
  key: string;
  label: string;
  count: number;
}

@Component({
  selector: 'app-comidas',
  standalone: true,
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule]
})
export class ComidasComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor() {
    // Llamar a la función para obtener productos de la API
    this.productService.fetchProductsFromAPI();
    
    // Suscribirse a los productos de la API
    this.productService.apiProducts$.subscribe(apiProducts => {
      if (apiProducts.length > 0) {
        // Transformar productos de la API al formato ExtendedProduct
        const extendedApiProducts: ExtendedProduct[] = apiProducts.map(product => ({
          ...product,
          available: true,
          popular: false,
          new: true,
          prepTime: "30-45 min",
          portions: "2-3 personas"
        }));
        
        // Actualizar los productos con los de la API
        this.products.set(extendedApiProducts);
        console.log('Productos actualizados desde API:', extendedApiProducts);
      }
    });
  }

  // Signals para el estado del componente
  products = signal<ExtendedProduct[]>([
    {
      id: 1,
      name: "Pollo al Spiedo Entero",
      description: "Pollo entero dorado al spiedo con especias secretas",
      category: "pollos",
      price: 3500,
      emoji: "🍗",
      available: true,
      popular: true,
      new: false,
      prepTime: "45-60 min",
      portions: "4-6 personas"
    },
    {
      id: 2,
      name: "Medio Pollo al Spiedo",
      description: "Media porción de nuestro famoso pollo al spiedo",
      category: "pollos",
      price: 1800,
      emoji: "🍗",
      available: true,
      popular: true,
      new: false,
      prepTime: "30-45 min",
      portions: "2-3 personas"
    },
    {
      id: 3,
      name: "Cuarto de Pollo",
      description: "Cuarto de pollo jugoso con piel dorada",
      category: "pollos",
      price: 950,
      emoji: "🍗",
      available: true,
      popular: false,
      new: false,
      prepTime: "20-30 min",
      portions: "1-2 personas"
    },
    {
      id: 4,
      name: "Milanesas de Pollo (4 unidades)",
      description: "Milanesas de pollo caseras, tiernas y doradas",
      category: "milanesas",
      price: 2800,
      emoji: "🍖",
      available: true,
      popular: true,
      new: false,
      prepTime: "25-35 min",
      portions: "3-4 personas"
    },
    {
      id: 5,
      name: "Milanesas de Carne (4 unidades)",
      description: "Milanesas de carne vacuna, jugosas y sabrosas",
      category: "milanesas",
      price: 3200,
      emoji: "🥩",
      available: true,
      popular: true,
      new: false,
      prepTime: "30-40 min",
      portions: "3-4 personas"
    },
    {
      id: 6,
      name: "Milanesas Napolitanas (4 unidades)",
      description: "Milanesas con jamón, queso y salsa de tomate",
      category: "milanesas",
      price: 3800,
      emoji: "🍕",
      available: false,
      popular: true,
      new: false,
      prepTime: "35-45 min",
      portions: "3-4 personas"
    },
    {
      id: 7,
      name: "Empanadas de Carne (6 unidades)",
      description: "Empanadas caseras rellenas de carne cortada a cuchillo",
      category: "empanadas",
      price: 2700,
      emoji: "🥟",
      available: true,
      popular: true,
      new: false,
      prepTime: "20-30 min",
      portions: "2-3 personas"
    },
    {
      id: 8,
      name: "Empanadas de Pollo (6 unidades)",
      description: "Empanadas de pollo desmenuzado con verduras",
      category: "empanadas",
      price: 2500,
      emoji: "🥟",
      available: true,
      popular: false,
      new: false,
      prepTime: "20-30 min",
      portions: "2-3 personas"
    },
    {
      id: 9,
      name: "Empanadas de Jamón y Queso (6 unidades)",
      description: "Empanadas clásicas de jamón cocido y queso",
      category: "empanadas",
      price: 2400,
      emoji: "🥟",
      available: true,
      popular: false,
      new: false,
      prepTime: "20-30 min",
      portions: "2-3 personas"
    },
    {
      id: 10,
      name: "Empanadas de Verdura (6 unidades)",
      description: "Empanadas vegetarianas con acelga, cebolla y queso",
      category: "empanadas",
      price: 2200,
      emoji: "🥟",
      available: true,
      popular: false,
      new: true,
      prepTime: "20-30 min",
      portions: "2-3 personas"
    },
    {
      id: 11,
      name: "Bife de Chorizo",
      description: "Bife de chorizo jugoso a la parrilla",
      category: "carnes",
      price: 4500,
      emoji: "🥩",
      available: true,
      popular: true,
      new: false,
      prepTime: "15-25 min",
      portions: "1 persona"
    },
    {
      id: 12,
      name: "Asado de Tira",
      description: "Asado de tira tierno con hueso",
      category: "carnes",
      price: 3800,
      emoji: "🥩",
      available: true,
      popular: false,
      new: false,
      prepTime: "40-60 min",
      portions: "2-3 personas"
    },
    {
      id: 13,
      name: "Matambre a la Pizza",
      description: "Matambre relleno con jamón, queso y salsa",
      category: "carnes",
      price: 5200,
      emoji: "🍕",
      available: false,
      popular: true,
      new: false,
      prepTime: "60-90 min",
      portions: "4-6 personas"
    },
    {
      id: 14,
      name: "Pollo Grillé",
      description: "Pollo marinado y grillado con hierbas",
      category: "pollos",
      price: 2800,
      emoji: "🍗",
      available: true,
      popular: false,
      new: true,
      prepTime: "35-45 min",
      portions: "2-3 personas"
    }
  ]);

  // Signals para el pop-up del carrito
  showCartPopup = signal(false);
  addedProduct = signal<ExtendedProduct | null>(null);

  // Signals para filtros
  searchTerm = signal('');
  selectedCategory = signal('all');
  priceFilter = signal('all');
  availabilityFilter = signal('all');
  sortOption = signal('name-asc');

  // Computed values
  totalProducts = computed(() => this.products().length);
  availableProducts = computed(() => this.products().filter(p => p.available).length);

  categories = computed((): CategoryInfo[] => {
    const allProducts = this.products();
    
    // Obtener categorías únicas dinámicamente
    const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
    
    const dynamicCategories = uniqueCategories.map(category => ({
      key: category.toLowerCase(),
      label: category,
      count: allProducts.filter(p => p.category === category).length
    }));

    return [
      {
        key: 'all',
        label: 'Todas',
        count: allProducts.length
      },
      ...dynamicCategories
    ];
  });

  filteredProducts = computed(() => {
    let filtered = this.products();

    // Filtro por búsqueda
    if (this.searchTerm()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    // Filtro por categoría
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === this.selectedCategory()
      );
    }

    // Filtro por precio
    if (this.priceFilter() !== 'all') {
      filtered = filtered.filter(product => this.passesPriceFilter(product.price));
    }

    // Filtro por disponibilidad
    if (this.availabilityFilter() !== 'all') {
      if (this.availabilityFilter() === 'available') {
        filtered = filtered.filter(product => product.available);
      } else if (this.availabilityFilter() === 'unavailable') {
        filtered = filtered.filter(product => !product.available);
      }
    }

    // Ordenamiento
    return this.sortProducts(filtered);
  });

  // Métodos para eventos
  onSearchChange() {
    // El two-way binding ya actualiza searchTerm automáticamente
  }

  clearSearch() {
    this.searchTerm.set('');
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onPriceFilterChange() {
    // El two-way binding ya actualiza priceFilter automáticamente
  }

  onAvailabilityFilterChange() {
    // El two-way binding ya actualiza availabilityFilter automáticamente
  }

  onSortChange() {
    // El two-way binding ya actualiza sortOption automáticamente
  }

  clearAllFilters() {
    this.searchTerm.set('');
    this.selectedCategory.set('all');
    this.priceFilter.set('all');
    this.availabilityFilter.set('all');
    this.sortOption.set('name-asc');
  }

  // Métodos auxiliares
  private passesPriceFilter(price: number): boolean {
    switch (this.priceFilter()) {
      case 'all':
        return true;
      case '0-2000':
        return price <= 2000;
      case '2000-4000':
        return price > 2000 && price <= 4000;
      case '4000-6000':
        return price > 4000 && price <= 6000;
      case '6000+':
        return price > 6000;
      default:
        return true;
    }
  }

  private sortProducts(products: ExtendedProduct[]): ExtendedProduct[] {
    const sorted = [...products];
    switch (this.sortOption()) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popular':
        return sorted.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.name.localeCompare(b.name);
        });
      default:
        return sorted;
    }
  }

  getFilterButtonClass(categoryKey: string): string {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium smooth-transition';
    if (this.selectedCategory() === categoryKey) {
      return `${baseClasses} filter-active`;
    }
    return `${baseClasses} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  }

  getProductCardClass(product: ExtendedProduct): string {
    return product.available ? '' : 'unavailable';
  }

  getFilterDescription(): string {
    let description = '';
    if (this.searchTerm()) {
      description += ` que contienen "${this.searchTerm()}"`;
    }
    if (this.selectedCategory() !== 'all') {
      const category = this.categories().find(c => c.key === this.selectedCategory());
      description += ` en categoría "${category?.label}"`;
    }
    return description;
  }

  formatPrice(price: number): string {
    return price.toLocaleString();
  }

  getCategoryLabel(categoryKey: string): string {
    const category = this.categories().find(c => c.key === categoryKey);
    return category?.label || categoryKey;
  }

  // Métodos para acciones
  viewProduct(product: ExtendedProduct) {
    this.router.navigate(['/comidas', product.id]);
  }

  addToCart(product: ExtendedProduct) {
    if (product.available) {
      // Convertir ExtendedProduct a Product para el servicio
      const baseProduct: Product = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        emoji: product.emoji
      };
      
      this.cartService.addToCart(baseProduct, 1);
      
      // Mostrar el pop-up
      this.addedProduct.set(product);
      this.showCartPopup.set(true);
      
      // Ocultar el pop-up después de 3 segundos
      setTimeout(() => {
        this.hideCartPopup();
      }, 3000);
      
      console.log('Producto agregado al carrito:', product.name);
    }
  }

  // Método para ocultar el pop-up manualmente
  hideCartPopup() {
    this.showCartPopup.set(false);
    this.addedProduct.set(null);
  }

  // Método para ir al carrito
  goToCart() {
    this.hideCartPopup();
    this.router.navigate(['/cart']);
  }
}
