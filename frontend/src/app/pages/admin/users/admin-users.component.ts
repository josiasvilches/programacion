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

  // Signals para estado
  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);

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
  async loadUsersFromBackend() {
    console.log('🔄 Iniciando carga de usuarios desde backend...');
    this.isLoading.set(true);
    try {
      const result = await this.userService.getAllUsersFromBackend(1, 100);
      console.log('📦 Respuesta del servicio:', result);
      
      if (result.success && result.data) {
        const backendUsers = result.data.usuarios || [];
        console.log('👥 Usuarios recibidos del backend:', backendUsers.length, backendUsers);
        
        const convertedUsers = this.convertBackendUsersToUI(backendUsers);
        console.log('✅ Usuarios convertidos al formato UI:', convertedUsers.length, convertedUsers);
        
        this.users.set(convertedUsers);
        console.log('✅ Signal actualizado. Usuarios actuales:', this.users());
      } else {
        console.error('❌ Error al cargar usuarios:', result.message);
        alert('Error al cargar usuarios del servidor: ' + (result.message || 'Error desconocido'));
      }
    } catch (error) {
      console.error('❌ Error al cargar usuarios desde backend:', error);
      alert('Error de conexión al cargar usuarios');
    } finally {
      this.isLoading.set(false);
      console.log('🏁 Carga de usuarios finalizada. isLoading:', this.isLoading());
    }
  }

  // Convertir usuarios del backend al formato de la UI
  convertBackendUsersToUI(backendUsers: any[]): User[] {
    return backendUsers.map(usuario => {
      // Mapear rol del backend al formato UI
      const roleMap: { [key: string]: User['role'] } = {
        'ADMIN': 'ADMIN',
        'cliente': 'USER',
        'trabajador': 'EMPLOYER',
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
  filterUsers(filter: string) {
    this.currentFilter = filter;
  }

  getFilteredUsers(): User[] {
    if (this.currentFilter === 'all') return this.users();
    if (this.currentFilter === 'admin') return this.users().filter(u => u.role === 'ADMIN');
    return this.users().filter(u => u.status === this.currentFilter);
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
      // Actualizar el signal
      const updatedUsers = [...currentUsers];
      updatedUsers[userIndex] = {
        ...user,
        status: newStatus === 'activo' ? 'active' : 'inactive'
      };
      this.users.set(updatedUsers);
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
                          this.userForm.role === 'EMPLOYER' ? 'trabajador' : 'cliente';
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

        console.log('📤 Datos a enviar al backend:', updateData);
        console.log('🆔 ID del usuario a actualizar:', this.editingUserId);

        const result = await this.userService.updateUserInBackend(
          this.editingUserId,
          updateData,
          token
        );

        console.log('📨 Resultado de la actualización:', result);

        if (result.success) {
          const updatedUsers = [...currentUsers];
          updatedUsers[index] = {
            ...currentUsers[index],
            name: this.userForm.name,
            email: this.userForm.email,
            phone: this.userForm.phone,
            role: this.userForm.role,
            status: this.userForm.status,
            notes: this.userForm.notes
          };
          this.users.set(updatedUsers);
          console.log('✅ Usuario actualizado exitosamente en el frontend');
          alert('Usuario actualizado exitosamente');
          this.closeUserModal();
          // Recargar usuarios para asegurar sincronización
          await this.loadUsersFromBackend();
        } else {
          console.error('❌ Error al actualizar usuario:', result);
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
