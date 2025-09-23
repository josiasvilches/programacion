import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';

interface ProductStats {
  label: string;
  value: string | number;
  icon: string;
  bgColor: string;
  textColor: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'low-stock';
  emoji: string;
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

  stats: ProductStats[] = [
    {
      label: 'Total Productos',
      value: 24,
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      label: 'Stock Bajo',
      value: 3,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      label: 'Ventas Hoy',
      value: '$45.200',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      label: 'Categorías',
      value: 6,
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Pollo al Spiedo Entero',
      description: 'Pollo entero cocido al spiedo',
      category: 'Pollos',
      price: 3500,
      stock: 15,
      status: 'active',
      emoji: '🍗'
    },
    {
      id: 2,
      name: 'Milanesas de Pollo',
      description: '4 unidades por porción',
      category: 'Milanesas',
      price: 2800,
      stock: 3,
      status: 'low-stock',
      emoji: '🍖'
    },
    {
      id: 3,
      name: 'Empanadas de Carne',
      description: '6 unidades por docena',
      category: 'Empanadas',
      price: 2700,
      stock: 25,
      status: 'active',
      emoji: '🥟'
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
    console.log('Editing product:', product);
    // Implementar lógica de edición
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
