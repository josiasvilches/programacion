import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  lastLogin: string | null;
  notes: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminSidebarComponent, AdminHeaderComponent],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  showUserModal = false;
  showActionModal = false;
  editingUserId: number | null = null;
  actionUserId: number | null = null;
  actionType: string | null = null;
  currentFilter = 'all';

  // Modal configuration
  modalConfig = {
    title: 'Agregar Usuario',
    actionTitle: 'Confirmar Acción',
    actionSubtitle: 'Esta acción afectará al usuario',
    actionMessage: '¿Estás seguro de que quieres realizar esta acción?',
    actionIcon: '',
    actionIconBg: '',
    actionButtonClass: ''
  };

  users: User[] = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@email.com",
      phone: "+54 9 11 1234-5678",
      role: "admin",
      status: "active",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-20",
      notes: "Administrador principal"
    },
    {
      id: 2,
      name: "María González",
      email: "maria@email.com",
      phone: "+54 9 11 2345-6789",
      role: "user",
      status: "active",
      registrationDate: "2024-01-18",
      lastLogin: "2024-01-19",
      notes: "Cliente frecuente"
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@email.com",
      phone: "+54 9 11 3456-7890",
      role: "user",
      status: "pending",
      registrationDate: "2024-01-20",
      lastLogin: null,
      notes: "Pendiente de validación"
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana@email.com",
      phone: "+54 9 11 4567-8901",
      role: "user",
      status: "active",
      registrationDate: "2024-01-16",
      lastLogin: "2024-01-18",
      notes: ""
    },
    {
      id: 5,
      name: "Luis Torres",
      email: "luis@email.com",
      phone: "+54 9 11 5678-9012",
      role: "user",
      status: "pending",
      registrationDate: "2024-01-21",
      lastLogin: null,
      notes: "Registro reciente"
    },
    {
      id: 6,
      name: "Sofia López",
      email: "sofia@email.com",
      phone: "+54 9 11 6789-0123",
      role: "admin",
      status: "active",
      registrationDate: "2024-01-10",
      lastLogin: "2024-01-20",
      notes: "Administrador de contenido"
    },
    {
      id: 7,
      name: "Diego Fernández",
      email: "diego@email.com",
      phone: "+54 9 11 7890-1234",
      role: "user",
      status: "inactive",
      registrationDate: "2024-01-12",
      lastLogin: "2024-01-14",
      notes: "Usuario inactivo por solicitud propia"
    },
    {
      id: 8,
      name: "Laura Sánchez",
      email: "laura@email.com",
      phone: "+54 9 11 8901-2345",
      role: "user",
      status: "pending",
      registrationDate: "2024-01-22",
      lastLogin: null,
      notes: "Esperando validación de documentos"
    }
  ];

  // Form data for user modal
  userForm = {
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'user' as 'user' | 'admin',
    status: 'pending' as 'active' | 'inactive' | 'pending',
    notes: ''
  };

  constructor() {}

  ngOnInit() {
  }

  // Filter methods
  filterUsers(filter: string) {
    this.currentFilter = filter;
  }

  getFilteredUsers(): User[] {
    if (this.currentFilter === 'all') return this.users;
    if (this.currentFilter === 'admin') return this.users.filter(u => u.role === 'admin');
    return this.users.filter(u => u.status === this.currentFilter);
  }

  // User actions
  validateUser(id: number) {
    this.showActionModalFn(
      'validate',
      id,
      'Validar Usuario',
      'Aprobar registro',
      '¿Confirmas que quieres validar este usuario? Podrá acceder al sistema.',
      'bg-green-100',
      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'bg-green-500 text-white hover:bg-green-600'
    );
  }

  promoteToAdmin(id: number) {
    this.showActionModalFn(
      'promote',
      id,
      'Promover a Administrador',
      'Cambiar rol de usuario',
      '¿Estás seguro de que quieres hacer administrador a este usuario? Tendrá acceso completo al sistema.',
      'bg-purple-100',
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      'bg-purple-500 text-white hover:bg-purple-600'
    );
  }

  deactivateUser(id: number) {
    this.showActionModalFn(
      'deactivate',
      id,
      'Dar de Baja Usuario',
      'Desactivar cuenta',
      '¿Estás seguro de que quieres dar de baja a este usuario? No podrá acceder al sistema.',
      'bg-red-100',
      'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728',
      'bg-red-500 text-white hover:bg-red-600'
    );
  }

  activateUser(id: number) {
    this.showActionModalFn(
      'activate',
      id,
      'Reactivar Usuario',
      'Activar cuenta',
      '¿Confirmas que quieres reactivar este usuario? Podrá volver a acceder al sistema.',
      'bg-green-100',
      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'bg-green-500 text-white hover:bg-green-600'
    );
  }

  editUser(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    this.editingUserId = id;
    this.modalConfig.title = 'Editar Usuario';
    this.userForm = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      notes: user.notes
    };

    this.showUserModal = true;
  }

  // Modal methods
  openAddUserModal() {
    this.editingUserId = null;
    this.modalConfig.title = 'Agregar Usuario';
    this.userForm = {
      id: '',
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'pending',
      notes: ''
    };
    this.showUserModal = true;
  }

  closeUserModal() {
    this.showUserModal = false;
  }

  showActionModalFn(action: string, userId: number, title: string, subtitle: string, message: string, iconBg: string, icon: string, buttonClass: string) {
    this.actionType = action;
    this.actionUserId = userId;
    this.modalConfig.actionTitle = title;
    this.modalConfig.actionSubtitle = subtitle;
    this.modalConfig.actionMessage = message;
    this.modalConfig.actionIconBg = iconBg;
    this.modalConfig.actionIcon = icon;
    this.modalConfig.actionButtonClass = buttonClass;
    this.showActionModal = true;
  }

  closeActionModal() {
    this.showActionModal = false;
    this.actionType = null;
    this.actionUserId = null;
  }

  confirmAction() {
    if (!this.actionType || !this.actionUserId) return;

    const userIndex = this.users.findIndex(u => u.id === this.actionUserId);
    if (userIndex === -1) return;

    switch (this.actionType) {
      case 'validate':
        this.users[userIndex].status = 'active';
        break;
      case 'deactivate':
        this.users[userIndex].status = 'inactive';
        break;
      case 'activate':
        this.users[userIndex].status = 'active';
        break;
    }

    this.closeActionModal();
  }

  // Form submission
  onSubmitUser() {
    if (this.editingUserId) {
      // Edit existing user
      const index = this.users.findIndex(u => u.id === this.editingUserId);
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          name: this.userForm.name,
          email: this.userForm.email,
          phone: this.userForm.phone,
          role: this.userForm.role,
          status: this.userForm.status,
          notes: this.userForm.notes
        };
      }
    } else {
      // Add new user
      const newId = Math.max(...this.users.map(u => u.id)) + 1;
      this.users.push({
        id: newId,
        name: this.userForm.name,
        email: this.userForm.email,
        phone: this.userForm.phone,
        role: this.userForm.role,
        status: this.userForm.status,
        registrationDate: new Date().toISOString().split('T')[0],
        notes: this.userForm.notes,
        lastLogin: null
      });
    }

    this.closeUserModal();
  }

  // Utility methods
  getStatusName(status: string): string {
    const names = {
      'active': 'Activo',
      'inactive': 'Inactivo',
      'pending': 'Pendiente'
    };
    return names[status as keyof typeof names] || status;
  }

  getRoleName(role: string): string {
    return role === 'admin' ? 'Admin' : 'Usuario';
  }

  getUserInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR');
  }

  exportUsers() {
    alert('Exportando lista de usuarios...\n\nEn una implementación real, esto generaría un archivo CSV o Excel con todos los datos de usuarios.');
  }

  getFilterClass(filter: string): string {
    return this.currentFilter === filter 
      ? 'px-4 py-2 rounded-lg font-medium bg-red-500 text-white transition-all duration-200'
      : 'px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200';
  }
}
