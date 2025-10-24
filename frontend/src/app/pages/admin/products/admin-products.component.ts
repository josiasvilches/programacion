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
  stock?: number;
  status?: 'active' | 'inactive' | 'low-stock';
  available?: boolean;
  popular?: boolean;
  new?: boolean;
  prepTime?: string;
  portions?: string;
  imagen?: string;
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

  // Cargar productos desde el backend
  async loadProducts() {
    this.isLoading.set(true);
    try {
      await this.productService.fetchProducts({ per_page: 100 });
      
      // Suscribirse a los productos del servicio
      this.productService.apiProducts$.subscribe(apiProducts => {
        const adminProducts: AdminProduct[] = apiProducts.map(p => ({
          ...p,
          stock: 10, // Valor por defecto
          status: p.disponible === false ? 'inactive' : 'active',
          available: p.disponible !== false,
          popular: false,
          new: false,
          prepTime: '30-45 min',
          portions: '2-3 personas',
        }));
        this.products.set(adminProducts);
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

  oldProducts: AdminProduct[] = [
    {
      id: 1,
      name: "Pollo al Spiedo Entero",
      description: "Pollo entero dorado al spiedo con especias secretas",
      category: "Pollos",
      price: 3500,
      emoji: "🍗",
      stock: 15,
      status: 'active',
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
      category: "Pollos",
      price: 1800,
      emoji: "🍗",
      stock: 12,
      status: 'active',
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
      category: "Pollos",
      price: 950,
      emoji: "🍗",
      stock: 20,
      status: 'active',
      available: true,
      popular: false,
      new: false,
      prepTime: "20-30 min",
      portions: "1-2 personas"
    },
    {
      id: 4,
      name: "Milanesas de Pollo",
      description: "Milanesas de pollo caseras, tiernas y doradas",
      category: "Milanesas",
      price: 2800,
      emoji: "🍖",
      stock: 8,
      status: 'active',
      available: true,
      popular: true,
      new: false,
      prepTime: "25-35 min",
      portions: "3-4 personas"
    },
    {
      id: 5,
      name: "Milanesas de Carne",
      description: "Milanesas de carne vacuna, jugosas y sabrosas",
      category: "Milanesas",
      price: 3200,
      emoji: "🥩",
      stock: 6,
      status: 'active',
      available: true,
      popular: true,
      new: false,
      prepTime: "30-40 min",
      portions: "3-4 personas"
    },
    {
      id: 6,
      name: "Milanesas Napolitanas",
      description: "Milanesas con jamón, queso y salsa de tomate",
      category: "Milanesas",
      price: 3800,
      emoji: "🍕",
      stock: 0,
      status: 'inactive',
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
      category: "Empanadas",
      price: 2700,
      emoji: "🥟",
      stock: 25,
      status: 'active',
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
      category: "Empanadas",
      price: 2500,
      emoji: "🥟",
      stock: 18,
      status: 'active',
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
      category: "Empanadas",
      price: 2400,
      emoji: "🥟",
      stock: 22,
      status: 'active',
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
      category: "Empanadas",
      price: 2200,
      emoji: "🥟",
      stock: 15,
      status: 'active',
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
      category: "Carnes",
      price: 4500,
      emoji: "🥩",
      stock: 5,
      status: 'low-stock',
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
      category: "Carnes",
      price: 3800,
      emoji: "🥩",
      stock: 8,
      status: 'active',
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
      category: "Carnes",
      price: 5200,
      emoji: "🍕",
      stock: 0,
      status: 'inactive',
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
      category: "Pollos",
      price: 2800,
      emoji: "🍗",
      stock: 10,
      status: 'active',
      available: true,
      popular: false,
      new: true,
      prepTime: "35-45 min",
      portions: "2-3 personas"
    }
  ];

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
        imagen: this.newProduct.imagen || '',
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
        imagen: this.selectedProduct.imagen || '',
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
}
