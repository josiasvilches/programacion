import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'low-stock';
  emoji: string;
  available: boolean;
  popular: boolean;
  new: boolean;
  prepTime: string;
  portions: string;
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
  selectedProduct: Product | null = null;

  products: Product[] = [
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

  constructor() {}

  ngOnInit() {}

  openAddProductModal() {
    this.showAddProductModal = true;
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product }; // Crear una copia del producto
    this.showEditProductModal = true;
  }

  saveEditedProduct() {
    if (this.selectedProduct) {
      const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
      if (index !== -1) {
        this.products[index] = { ...this.selectedProduct };
      }
      this.closeEditProductModal();
    }
  }

  closeEditProductModal() {
    this.showEditProductModal = false;
    this.selectedProduct = null;
  }

  deleteProduct(product: Product) {
    console.log('Deleting product:', product);
    // Implementar lógica de eliminación
    if (confirm(`¿Estás seguro que deseas eliminar ${product.name}?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
    }
  }

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

  addProduct(formData: any) {
    // Implementar lógica para agregar producto
    console.log('Adding product:', formData);
    this.closeAddProductModal();
  }
}
