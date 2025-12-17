import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../../../components/admin/sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../../components/admin/header/admin-header.component';
import { UserService } from '../../../services/user.service';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'USER' | 'ADMIN' | 'EMPLOYER';
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

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  totalPages = 0;

  // Signals para estado
  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);

  // Exponer Math para usarlo en el template
  Math = Math;

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

  constructor(private userService: UserService) {}

  async ngOnInit() {
    await this.loadUsersFromBackend();
  }

  // Cargar usuarios desde el backend
  async loadUsersFromBackend(page: number = this.currentPage) {
    console.log(`Iniciando carga de usuarios desde backend - Página: ${page}`);
    this.isLoading.set(true);
    try {
      // Construir filtros basados en el filtro actual
      const filters: { estado?: string; rol?: string } = {};

      // Mapear filtros del UI al formato del backend
      if (this.currentFilter === 'active') {
        filters.estado = 'activo';
      } else if (this.currentFilter === 'pending') {
        filters.estado = 'pendiente';
      } else if (this.currentFilter === 'inactive') {
        filters.estado = 'inactivo';
      } else if (this.currentFilter === 'admin') {
        filters.rol = 'ADMIN';
      }
      // Si el filtro es 'all', no se envía ningún filtro

      console.log('Filtros aplicados:', filters);

      const result = await this.userService.getAllUsersFromBackend(page, this.pageSize, filters);
      console.log('Respuesta del servicio:', result);

      if (result.success && result.data) {
        const backendUsers = result.data.usuarios || [];
        console.log('Usuarios recibidos del backend:', backendUsers.length, backendUsers);

        // Actualizar información de paginación desde la respuesta del backend
        this.currentPage = result.data.page || page;
        this.totalPages = result.data.pages || 1;
        this.totalUsers = result.data.total || backendUsers.length;

        const convertedUsers = this.convertBackendUsersToUI(backendUsers);
        console.log('Usuarios convertidos al formato UI:', convertedUsers.length, convertedUsers);

        this.users.set(convertedUsers);
        console.log(`Paginación actualizada - Página ${this.currentPage} de ${this.totalPages}. Total: ${this.totalUsers} usuarios`);
      } else {
        console.error('Error al cargar usuarios:', result.message);
        alert('Error al cargar usuarios del servidor: ' + (result.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error al cargar usuarios desde backend:', error);
      alert('Error de conexión al cargar usuarios');
    } finally {
      this.isLoading.set(false);
      console.log('Carga de usuarios finalizada. isLoading:', this.isLoading());
    }
  }

  // Convertir usuarios del backend al formato de la UI
  convertBackendUsersToUI(backendUsers: any[]): User[] {
    return backendUsers.map(usuario => {
      // Mapear rol del backend al formato UI
      const roleMap: { [key: string]: User['role'] } = {
        'ADMIN': 'ADMIN',
        'cliente': 'USER',
        'TRABAJADOR': 'EMPLOYER',
        'USER': 'USER',
        'EMPLOYER': 'EMPLOYER'
      };

      // Mapear estado del backend al formato UI
      const statusMap: { [key: string]: User['status'] } = {
        'activo': 'active',
        'inactivo': 'inactive',
        'pendiente': 'pending',
        'suspendido': 'inactive',
        'active': 'active',
        'inactive': 'inactive',
        'pending': 'pending'
      };

      return {
        id: usuario.usuario_id || usuario.id,
        name: usuario.nombre || 'Sin nombre',
        email: usuario.email || '',
        phone: usuario.numero || '',
        role: roleMap[usuario.rol] || 'USER',
        status: statusMap[usuario.estado?.toLowerCase()] || 'pending',
        registrationDate: usuario.fecha_registro || new Date().toISOString().split('T')[0],
        lastLogin: usuario.ultimo_acceso || null,
        notes: ''
      };
    });
  }

  // Form data for user modal
  userForm = {
    id: '',
    name: '',
    email: '',
    phone: '',
    role: 'USER' as 'USER' | 'ADMIN' | 'EMPLOYER',
    status: 'pending' as 'active' | 'inactive' | 'pending',
    notes: ''
  };

  // Filter methods
  async filterUsers(filter: string) {
    this.currentFilter = filter;
    // Resetear a la primera página al cambiar el filtro
    this.currentPage = 1;
    // Recargar usuarios con el filtro aplicado
    await this.loadUsersFromBackend(1);
  }

  getFilteredUsers(): User[] {
    // Los usuarios ya vienen filtrados desde el backend
    // Este método ahora solo retorna los usuarios actuales
    return this.users();
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
    const user = this.users().find(u => u.id === id);
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
      role: 'USER',
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

  // Métodos de navegación de paginación
  async goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage || this.isLoading()) {
      return;
    }
    await this.loadUsersFromBackend(page);
  }

  async nextPage() {
    if (this.currentPage < this.totalPages && !this.isLoading()) {
      await this.goToPage(this.currentPage + 1);
    }
  }

  async previousPage() {
    if (this.currentPage > 1 && !this.isLoading()) {
      await this.goToPage(this.currentPage - 1);
    }
  }

  async firstPage() {
    if (this.currentPage !== 1 && !this.isLoading()) {
      await this.goToPage(1);
    }
  }

  async lastPage() {
    if (this.currentPage !== this.totalPages && !this.isLoading()) {
      await this.goToPage(this.totalPages);
    }
  }

  // Obtener array de números de página para mostrar
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, this.currentPage + 2);
      
      if (this.currentPage <= 3) {
        endPage = Math.min(maxPagesToShow, this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        startPage = Math.max(1, this.totalPages - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  async confirmAction() {
    if (!this.actionType || !this.actionUserId) return;

    const userIndex = this.users().findIndex(u => u.id === this.actionUserId);
    if (userIndex === -1) return;

    const currentUsers = this.users();
    const user = currentUsers[userIndex];
    const token = this.userService.getAuthToken();

    if (!token) {
      console.error('No se encontró token de autenticación');
      alert('Debes iniciar sesión para realizar esta acción');
      return;
    }

    let newStatus: string;
    switch (this.actionType) {
      case 'validate':
        newStatus = 'activo';
        break;
      case 'deactivate':
        newStatus = 'inactivo';
        break;
      case 'activate':
        newStatus = 'activo';
        break;
      default:
        return;
    }

    // Actualizar en el backend
    const result = await this.userService.updateUserInBackend(
      this.actionUserId,
      { estado: newStatus },
      token
    );

    if (result.success) {
      // Recargar la página actual para reflejar los cambios
      await this.loadUsersFromBackend(this.currentPage);
      console.log('Usuario actualizado exitosamente');
    } else {
      console.error('Error al actualizar usuario:', result.message);
      alert('Error al actualizar el usuario: ' + result.message);
    }

    this.closeActionModal();
  }

  // Form submission
  async onSubmitUser() {
    const token = this.userService.getAuthToken();

    if (!token) {
      console.error('No se encontró token de autenticación');
      alert('Debes iniciar sesión para realizar esta acción');
      return;
    }

    if (this.editingUserId) {
      // Edit existing user
      const currentUsers = this.users();
      const index = currentUsers.findIndex(u => u.id === this.editingUserId);
      
      if (index !== -1) {
        // Mapear rol y estado al formato del backend
        const rolBackend = this.userForm.role === 'ADMIN' ? 'ADMIN' : 
                          this.userForm.role === 'EMPLOYER' ? 'TRABAJADOR' : 'cliente';
        const estadoBackend = this.userForm.status === 'active' ? 'activo' :
                             this.userForm.status === 'pending' ? 'pendiente' : 'inactivo';

        // Preparar datos para enviar (solo incluir campos con valor)
        const updateData: any = {
          rol: rolBackend,
          estado: estadoBackend
        };

        // Solo incluir campos que tienen valor y no están vacíos
        if (this.userForm.name && this.userForm.name.trim() !== '') {
          updateData.nombre = this.userForm.name.trim();
        }
        
        if (this.userForm.email && this.userForm.email.trim() !== '') {
          updateData.email = this.userForm.email.trim();
        }

        if (this.userForm.phone && this.userForm.phone.trim() !== '') {
          updateData.numero = this.userForm.phone.trim();
        }

        console.log('Datos a enviar al backend:', updateData);
        console.log('ID del usuario a actualizar:', this.editingUserId);

        const result = await this.userService.updateUserInBackend(
          this.editingUserId,
          updateData,
          token
        );

        console.log('Resultado de la actualización:', result);

        if (result.success) {
          console.log('Usuario actualizado exitosamente en el backend');
          alert('Usuario actualizado exitosamente');
          this.closeUserModal();
          // Recargar la página actual para asegurar sincronización
          await this.loadUsersFromBackend(this.currentPage);
        } else {
          console.error('Error al actualizar usuario:', result);
          alert('Error al actualizar el usuario:\n\n' + result.message + '\n\nRevisa la consola para más detalles.');
        }
      }
    } else {
      // Add new user - esto requeriría un endpoint POST en el backend
      alert('La creación de usuarios debe hacerse desde el endpoint de registro');
      this.closeUserModal();
    }
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
    const roleNames = {
      'ADMIN': 'Administrador',
      'USER': 'Usuario',
      'EMPLOYER': 'Empleado'
    };
    return roleNames[role as keyof typeof roleNames] || role;
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
