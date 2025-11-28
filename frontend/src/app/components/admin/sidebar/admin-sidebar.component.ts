import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';

interface SidebarItem {
  id: string;
  name: string;
  route: string;
  icon: string;
  tooltip: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  private userService = inject(UserService);

  private allSidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      route: '/admin',
      icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
      tooltip: 'Panel General'
    },
    {
      id: 'products',
      name: 'Productos',
      route: '/admin/products',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      tooltip: 'Productos'
    },
    {
      id: 'users',
      name: 'Usuarios',
      route: '/admin/users',
      icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      tooltip: 'Usuarios'
    },
    {
      id: 'orders',
      name: 'Pedidos',
      route: '/admin/orders',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      tooltip: 'Pedidos'
    },
    {
      id: 'email',
      name: 'Email',
      route: '/admin/email',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      tooltip: 'Email Marketing'
    }
  ];

  // Getter que filtra las opciones según el rol del usuario
  get sidebarItems(): SidebarItem[] {
    // Si es TRABAJADOR, solo mostrar Pedidos y Productos
    if (this.userService.isTrabajador()) {
      return this.allSidebarItems.filter(item => 
        item.id === 'orders' || item.id === 'products'
      );
    }
    // Para ADMIN y EMPLOYER mostrar todas las opciones
    return this.allSidebarItems;
  }

  constructor() {}
}
