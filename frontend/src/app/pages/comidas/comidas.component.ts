import { Component, ChangeDetectionStrategy, signal, computed, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PaginationComponent, PaginationInfo } from '../../components/pagination/pagination.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.interface';
import { Category } from '../../models/category.interface';

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
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, PaginationComponent]
})
export class ComidasComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Signal para las categorías de la API
  apiCategories = signal<Category[]>([]);
  
  // Signal para la información de paginación
  paginationInfo = signal<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  constructor() {
    // Llamar a la función para obtener productos de la API con página 1
    this.productService.fetchProducts({ page: 1 });
    
    // Llamar a la función para obtener categorías de la API
    this.categoryService.fetchCategoriesFromAPI();
    
    // Suscribirse a los productos de la API
    this.productService.apiProducts$.subscribe(apiProducts => {
      // Transformar productos de la API al formato ExtendedProduct
      const extendedApiProducts: ExtendedProduct[] = apiProducts.map(product => ({
        ...product,
        available: true,
        popular: false,
        new: true,
        prepTime: "30-45 min",
        portions: "2-3 personas"
      }));
      
      // Actualizar los productos con los de la API (incluso si está vacío)
      this.products.set(extendedApiProducts);
      console.log('Productos actualizados desde API:', extendedApiProducts);
      this.cdr.markForCheck();
    });

    // Suscribirse a la paginación
    this.productService.pagination$.subscribe(pagination => {
      this.paginationInfo.set({
        currentPage: pagination.page,
        totalPages: pagination.total_pages,
        totalItems: pagination.total,
        itemsPerPage: pagination.per_page
      });
      console.log('Paginación actualizada:', this.paginationInfo());
      this.cdr.markForCheck();
    });

    // Suscribirse a las categorías de la API
    this.categoryService.categories$.subscribe(apiCategories => {
      if (apiCategories.length > 0) {
        this.apiCategories.set(apiCategories);
        console.log('Categorías actualizadas desde API:', apiCategories);
        this.cdr.markForCheck();
      }
    });
  }

  // Signals para el estado del componente
  products = signal<ExtendedProduct[]>([]);

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
    const apiCats = this.apiCategories();
    
    // Si tenemos categorías de la API, usarlas
    if (apiCats.length > 0) {
      const dynamicCategories = apiCats.map(cat => ({
        key: cat.nombre_categoria.toLowerCase(),
        label: cat.nombre_categoria,
        count: allProducts.filter(p => 
          p.category.toLowerCase() === cat.nombre_categoria.toLowerCase()
        ).length
      }));

      return [
        {
          key: 'all',
          label: 'Todas',
          count: allProducts.length
        },
        ...dynamicCategories
      ];
    }
    
    // Fallback: Obtener categorías únicas dinámicamente de los productos
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

    // NOTA: Los filtros de búsqueda, categoría y precio se aplican en el backend
    // Aquí solo aplicamos filtros locales que no están disponibles en el backend
    
    // Filtro por disponibilidad (solo local)
    if (this.availabilityFilter() !== 'all') {
      if (this.availabilityFilter() === 'available') {
        filtered = filtered.filter(product => product.available);
      } else if (this.availabilityFilter() === 'unavailable') {
        filtered = filtered.filter(product => !product.available);
      }
    }

    // Ordenamiento (solo local)
    return this.sortProducts(filtered);
  });

  // Método auxiliar para construir filtros actuales
  private buildCurrentFilters(page: number = 1): any {
    const filters: any = { page };
    
    // Filtro por categoría
    if (this.selectedCategory() !== 'all') {
      const apiCats = this.apiCategories();
      const selectedCat = apiCats.find(cat => 
        cat.nombre_categoria.toLowerCase() === this.selectedCategory()
      );
      if (selectedCat) {
        filters.id_categoria = selectedCat.categoria_id;
      }
    }
    
    // Filtro por nombre/búsqueda
    if (this.searchTerm()) {
      filters.nombre = this.searchTerm();
    }
    
    // Filtro por precio
    if (this.priceFilter() !== 'all') {
      const priceRange = this.getPriceRange(this.priceFilter());
      if (priceRange.min !== undefined) {
        filters.precio_min = priceRange.min;
      }
      if (priceRange.max !== undefined) {
        filters.precio_max = priceRange.max;
      }
    }
    
    console.log('Filtros construidos:', filters);
    return filters;
  }

  // Obtener rango de precios según el filtro
  private getPriceRange(filter: string): { min?: number, max?: number } {
    switch (filter) {
      case '0-5000':
        return { min: 0, max: 5000 };
      case '5000-10000':
        return { min: 5000, max: 10000 };
      case '10000-20000':
        return { min: 10000, max: 20000 };
      case '20000+':
        return { min: 20000 };
      default:
        return {};
    }
  }

  // Métodos para eventos
  async onSearchChange() {
    console.log('onSearchChange llamado, término:', this.searchTerm());
    // Hacer fetch con los filtros actuales
    await this.productService.fetchProducts(this.buildCurrentFilters(1));
  }

  async clearSearch() {
    console.log('clearSearch llamado');
    this.searchTerm.set('');
    // Hacer fetch sin el filtro de búsqueda
    await this.productService.fetchProducts(this.buildCurrentFilters(1));
  }

  async setCategory(category: string) {
    console.log('setCategory llamado, categoría:', category);
    this.selectedCategory.set(category);
    // Hacer fetch con todos los filtros actuales
    await this.productService.fetchProducts(this.buildCurrentFilters(1));
  }

  // Método para manejar el cambio de página
  async onPageChange(page: number): Promise<void> {
    console.log(`onPageChange llamado, página: ${page}`);
    
    // Hacer fetch con los filtros actuales y la nueva página
    await this.productService.fetchProducts(this.buildCurrentFilters(page));
    
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async onPriceFilterChange() {
    console.log('onPriceFilterChange llamado, precio:', this.priceFilter());
    // Hacer fetch con los filtros actuales incluyendo el nuevo precio
    await this.productService.fetchProducts(this.buildCurrentFilters(1));
  }

  onAvailabilityFilterChange() {
    console.log('onAvailabilityFilterChange llamado, disponibilidad:', this.availabilityFilter());
    // El filtro de disponibilidad se aplica localmente en filteredProducts
  }

  onSortChange() {
    console.log('onSortChange llamado, ordenamiento:', this.sortOption());
    // El ordenamiento se aplica localmente en filteredProducts
  }

  async clearAllFilters() {
    console.log('clearAllFilters llamado');
    this.searchTerm.set('');
    this.selectedCategory.set('all');
    this.priceFilter.set('all');
    this.availabilityFilter.set('all');
    this.sortOption.set('name-asc');
    
    // Hacer fetch sin filtros
    await this.productService.fetchProducts({ page: 1 });
  }

  // Métodos auxiliares
  private passesPriceFilter(price: number): boolean {
    switch (this.priceFilter()) {
      case 'all':
        return true;
      case '0-5000':
        return price <= 5000;
      case '5000-10000':
        return price > 5000 && price <= 10000;
      case '10000-20000':
        return price > 10000 && price <= 20000;
      case '20000+':
        return price > 20000;
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

  getCategoryLabel(category: string): string {
    const found = this.categories().find(c => c.key === category);
    return found ? found.label : category;
  }

  // Manejar error de carga de imagen
  onImageError(event: Event, product: ExtendedProduct) {
    const imgElement = event.target as HTMLImageElement;
    
    // Ocultar la imagen que falló
    imgElement.style.display = 'none';
    
    // Buscar el contenedor y agregar el emoji
    const container = imgElement.parentElement;
    if (container && !container.querySelector('.emoji-fallback')) {
      const emojiSpan = document.createElement('span');
      emojiSpan.className = 'emoji-fallback text-6xl';
      emojiSpan.textContent = product.emoji || '🍽️';
      container.appendChild(emojiSpan);
    }
    
    console.warn(`Error al cargar imagen para ${product.name}:`, product.imagen);
  }

  // Track by function para optimizar renderizado
  trackByProductId(index: number, product: any): number {
    return product.id;
  }

  // Métodos para el carrito y navegación
  viewProduct(product: ExtendedProduct): void {
    this.router.navigate(['/product', product.id]);
  }

  addToCart(product: ExtendedProduct): void {
    if (!product.available) {
      return;
    }
    
    this.cartService.addToCart(product, 1);
    this.addedProduct.set(product);
    this.showCartPopup.set(true);
    
    // Auto-cerrar después de 3 segundos
    setTimeout(() => {
      this.hideCartPopup();
    }, 3000);
  }

  hideCartPopup(): void {
    this.showCartPopup.set(false);
    this.addedProduct.set(null);
  }

  goToCart(): void {
    this.hideCartPopup();
    this.router.navigate(['/cart']);
  }
}
