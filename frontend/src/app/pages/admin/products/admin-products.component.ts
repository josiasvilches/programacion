import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { UserService } from '../../../services/user.service';
import { Product } from '../../../models/product.interface';
import { Category } from '../../../models/category.interface';

interface AdminProduct extends Product {
  id_categoria?: number;
  stock?: number;
  status?: 'active' | 'inactive' | 'low-stock';
  available?: boolean;
  popular?: boolean;
  new?: boolean;
  prepTime?: string;
  portions?: string;
  imagen?: string;
  imagen_url?: string;  // Agregar esta propiedad
  disponible?: boolean;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  showAddProductModal = false;
  showEditProductModal = false;
  selectedProduct: AdminProduct | null = null;

  // Signals para manejar productos y categorías
  products = signal<AdminProduct[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);

  // Propiedades de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  productsPerPage: number = 10;
  totalProducts: number = 0;
  Math = Math;

  // Producto temporal para agregar/editar
  newProduct: AdminProduct = this.getEmptyProduct();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.loadProducts();
    await this.loadCategories();
  }

  // Obtener producto vacío
  getEmptyProduct(): AdminProduct {
    return {
      id: 0,
      name: '',
      description: '',
      category: '',
      price: 0,
      stock: 0,
      status: 'active',
      emoji: '🍽️',
      available: true,
      popular: false,
      new: false,
      prepTime: '30-45 min',
      portions: '2-3 personas',
      id_categoria: undefined,
      disponible: true,
    };
  }

  // Método para manejar errores de imagen
  onImageError(event: any, product: AdminProduct): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default-product.png';
    imgElement.onerror = null; // Prevenir loop infinito
  }

  // Métodos de paginación
  firstPage(): void {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  lastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages;
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  // Cargar productos desde el backend
  async loadProducts() {
    this.isLoading.set(true);
    try {
      await this.productService.fetchProducts({ 
        page: this.currentPage,
        per_page: this.productsPerPage 
      });
      
      // Suscribirse a los productos del servicio
      this.productService.apiProducts$.subscribe(apiProducts => {
        const adminProducts: AdminProduct[] = apiProducts.map(p => ({
          ...p,
          imagen_url: p.imagen_url,  // Asegurar que se mapea imagen_url
          stock: 10,
          status: p.disponible === false ? 'inactive' : 'active',
          available: p.disponible !== false,
          popular: false,
          new: false,
          prepTime: '30-45 min',
          portions: '2-3 personas',
        }));
        this.products.set(adminProducts);
      });

      // Actualizar información de paginación
      this.productService.pagination$.subscribe(pagination => {
        this.totalPages = pagination.total_pages;
        this.totalProducts = pagination.total;
        this.currentPage = pagination.page;
        this.productsPerPage = pagination.per_page;
      });
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar los productos');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Cargar categorías desde el backend
  async loadCategories() {
    try {
      await this.categoryService.fetchCategoriesFromAPI();
      
      // Suscribirse a las categorías del servicio
      this.categoryService.categories$.subscribe(categories => {
        this.categories.set(categories);
      });
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  // Crear un nuevo producto en el backend
  async addProduct() {
    if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.id_categoria) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    // Obtener el token de autenticación
    const token = this.userService.getAuthToken();
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    this.isLoading.set(true);
    try {
      const productData = {
        nombre: this.newProduct.name,
        descripcion: this.newProduct.description || '',
        precio: this.newProduct.price,
        id_categoria: this.newProduct.id_categoria,
        stock: this.newProduct.stock || 0,
        disponible: this.newProduct.available !== false,
        imagen_url: this.newProduct.imagen || '',  // Cambiar 'imagen' por 'imagen_url'
      };

      const result = await this.productService.createProduct(productData, token);

      if (result.success) {
        alert('Producto creado exitosamente');
        await this.loadProducts();
        this.closeAddProductModal();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear el producto');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Editar un producto
  editProduct(product: AdminProduct) {
    this.openEditProductModal(product);
  }

  // Guardar cambios del producto editado
  async saveEditedProduct() {
    if (!this.selectedProduct) return;

    if (!this.selectedProduct.name || !this.selectedProduct.price || !this.selectedProduct.id_categoria) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    // Obtener el token de autenticación
    const token = this.userService.getAuthToken();
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    this.isLoading.set(true);
    try {
      const productData = {
        nombre: this.selectedProduct.name,
        descripcion: this.selectedProduct.description || '',
        precio: this.selectedProduct.price,
        id_categoria: this.selectedProduct.id_categoria,
        stock: this.selectedProduct.stock || 0,
        disponible: this.selectedProduct.available !== false,
        imagen_url: this.selectedProduct.imagen || '',  // Cambiar 'imagen' por 'imagen_url'
      };

      const result = await this.productService.updateProduct(
        this.selectedProduct.id,
        productData,
        token
      );

      if (result.success) {
        alert('Producto actualizado exitosamente');
        await this.loadProducts();
        this.closeEditProductModal();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar el producto');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Eliminar un producto
  async deleteProduct(product: AdminProduct) {
    if (!confirm(`¿Estás seguro que deseas eliminar ${product.name}?`)) {
      return;
    }

    // Obtener el token de autenticación
    const token = this.userService.getAuthToken();
    if (!token) {
      alert('No estás autenticado. Por favor, inicia sesión.');
      return;
    }

    this.isLoading.set(true);
    try {
      const result = await this.productService.deleteProduct(product.id, token);

      if (result.success) {
        alert('Producto eliminado exitosamente');
        await this.loadProducts();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Métodos auxiliares
  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'low-stock':
        return 'status-pending';
      default:
        return 'status-inactive';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'low-stock':
        return 'Stock Bajo';
      default:
        return 'Inactivo';
    }
  }

  // Obtener nombre de categoría por ID
  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return 'Sin categoría';
    const category = this.categories().find(c => c.categoria_id === categoryId);
    return category?.nombre_categoria || 'Sin categoría';
  }

  // Métodos para manejar modales
  openAddProductModal() {
    this.newProduct = this.getEmptyProduct();
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.newProduct = this.getEmptyProduct();
  }

  openEditProductModal(product: AdminProduct) {
    this.selectedProduct = { ...product };
    this.showEditProductModal = true;
  }

  closeEditProductModal() {
    this.showEditProductModal = false;
    this.selectedProduct = null;
  }
}
