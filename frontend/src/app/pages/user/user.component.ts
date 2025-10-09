import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';

interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  initials: string;
  role: string;
  status: string;
  memberSince: string;
  lastAccess: string;
  ordersCount: number;
  isHighlighted: boolean;
}

interface UserStats {
  memberSince: string;
  lastAccess: string;
  ordersCount: number;
  isHighlighted: boolean;
}

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  // Signals para el estado del componente
  isEditing = signal(false);
  isLoading = signal(false);
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  // Usuario desde el servicio - las iniciales se generan automáticamente
  userProfile = computed(() => {
    const user = this.userService.user();
    if (!user) return null;
    
    return {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      initials: user.initials,
      role: user.role,
      status: user.status,
      memberSince: '15 de Noviembre, 2023',
      lastAccess: 'Hace 2 horas',
      ordersCount: 12,
      isHighlighted: true
    };
  });

  // Formulario reactivo
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor() {
    const user = this.userProfile();
    
    this.profileForm = this.fb.group({
      fullName: [user?.fullName || '', [Validators.required, Validators.minLength(2)]],
      email: [user?.email || '', [Validators.required, Validators.email]],
      phone: [user?.phone || '', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{10,15}$/)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Deshabilitar formulario inicialmente
    this.profileForm.disable();
  }

  // Custom validator para confirmar contraseñas
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  // Computed para validaciones
  fullNameError = computed(() => {
    const control = this.profileForm.get('fullName');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'El nombre es requerido';
      if (control.errors['minlength']) return 'El nombre debe tener al menos 2 caracteres';
    }
    return null;
  });

  emailError = computed(() => {
    const control = this.profileForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'El email es requerido';
      if (control.errors['email']) return 'Por favor ingresá un email válido';
    }
    return null;
  });

  phoneError = computed(() => {
    const control = this.profileForm.get('phone');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'El teléfono es requerido';
      if (control.errors['pattern']) return 'Por favor ingresá un número de teléfono válido';
    }
    return null;
  });

  currentPasswordError = computed(() => {
    const control = this.passwordForm.get('currentPassword');
    if (control?.touched && control?.errors?.['required']) {
      return 'La contraseña actual es requerida';
    }
    return null;
  });

  newPasswordError = computed(() => {
    const control = this.passwordForm.get('newPassword');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'La nueva contraseña es requerida';
    }
    return null;
  });

  confirmPasswordError = computed(() => {
    const control = this.passwordForm.get('confirmPassword');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Confirmá tu nueva contraseña';
      if (control.errors['passwordMismatch']) return 'Las contraseñas no coinciden';
    }
    return null;
  });

  // Computed para verificar si hay cambios sin guardar
  hasUnsavedChanges = computed(() => {
    if (!this.isEditing()) return false;
    
    const currentUser = this.userProfile();
    if (!currentUser) return false;
    
    const formValues = this.profileForm.value;
    
    return (
      formValues.fullName !== currentUser.fullName ||
      formValues.email !== currentUser.email ||
      this.passwordForm.get('newPassword')?.value ||
      this.passwordForm.get('confirmPassword')?.value
    );
  });

  // Métodos para toggle de visibilidad de contraseñas
  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword.set(!this.showCurrentPassword());
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword.set(!this.showNewPassword());
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  // Método para entrar/salir del modo edición
  toggleEdit() {
    if (this.isEditing()) {
      this.cancelEdit();
    } else {
      this.startEdit();
    }
  }

  startEdit() {
    this.isEditing.set(true);
    this.profileForm.enable();
  }

  cancelEdit() {
    if (this.hasUnsavedChanges()) {
      if (!confirm('Tenés cambios sin guardar. ¿Estás seguro que querés cancelar?')) {
        return;
      }
    }

    this.isEditing.set(false);
    this.profileForm.disable();
    
    // Restaurar valores originales
    const user = this.userProfile();
    if (user) {
      this.profileForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      });
    }

    // Limpiar formulario de contraseña
    this.passwordForm.reset();
  }

  // Método para guardar perfil -> realiza una petición al backend
  async saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    // Validar contraseña solo si se está cambiando
    const newPassword = this.passwordForm.get('newPassword')?.value;
    if (newPassword && this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      alert('No hay usuario logueado');
      return;
    }

    // Construir payload con sólo los campos que cambiaron
    const formValues = this.profileForm.value;
    const payload: any = {};
  if (formValues.fullName !== currentUser.fullName) payload.fullName = formValues.fullName;
  if (formValues.email !== currentUser.email) payload.email = formValues.email;
  // El backend espera el campo "numero" para el teléfono
  if (formValues.phone !== currentUser.phone) payload.numero = formValues.phone;
    if (newPassword) payload.password = newPassword;

    // Si no hay cambios, salir
    if (Object.keys(payload).length === 0) {
      // No hay cambios, cerrar edición
      this.isEditing.set(false);
      this.profileForm.disable();
      return;
    }

    this.isLoading.set(true);

    try {
      const token = this.userService.getAuthToken();
      const url = `http://localhost:5001/usuario/${currentUser.id}`;

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        let errorMsg = 'Error al actualizar el usuario.';
        try {
          const err = await res.json();
          errorMsg = err.message || err.mensaje || errorMsg;
        } catch (_) {}
        alert(errorMsg);
        return;
      }

      const data = await res.json();

      // Actualizar el usuario en el frontend
  const updatedFields: any = {};
  if (payload.fullName) updatedFields.fullName = payload.fullName;
  if (payload.email) updatedFields.email = payload.email;
  // mapear "numero" del backend a la propiedad "phone" del frontend
  if (payload.numero) updatedFields.phone = payload.numero;

      this.userService.updateUser(updatedFields);

      this.isEditing.set(false);
      this.profileForm.disable();
      this.passwordForm.reset();

      alert(data.message || data.mensaje || 'Perfil actualizado correctamente!');
    } catch (error) {
      console.error('Error guardando perfil:', error);
      alert('Error de conexión. Verificá tu red y volvé a intentar.');
    } finally {
      this.isLoading.set(false);
    }
  }

  // Método para resetear formulario
  resetForm() {
    if (!confirm('¿Estás seguro que querés descartar todos los cambios?')) {
      return;
    }

    const user = this.userProfile();
    if (user) {
      this.profileForm.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
      });
    }
    this.passwordForm.reset();
  }

  // Método para cambiar foto de perfil
  changeProfilePicture() {
    alert('Funcionalidad para cambiar foto de perfil. En una app real, esto abriría un selector de archivos.');
  }

  // Métodos para probar el cambio dinámico de iniciales (solo para demostración)
  switchToUser1() {
    this.userService.switchToUser({
      id: 1,
      fullName: 'María García Fernández',
      email: 'maria.garcia@email.com',
      role: 'USER',
      status: 'Activo'
    });
  }

  switchToUser2() {
    this.userService.switchToUser({
      id: 2,
      fullName: 'Carlos Eduardo López',
      email: 'carlos.lopez@email.com',
      role: 'USER',
      status: 'Activo'
    });
  }

  switchToUser3() {
    this.userService.switchToUser({
      id: 3,
      fullName: 'Ana Sofía',
      email: 'ana.sofia@email.com',
      role: 'USER',
      status: 'Activo'
    });
  }

  // Nuevos métodos para cambiar entre tipos de usuarios
  loginAsAdmin() {
    this.userService.loginAsAdmin();
  }

  loginAsEmployee() {
    this.userService.loginAsEmployee();
  }

  loginAsClient() {
    this.userService.loginAsClient();
  }

  logout() {
    this.userService.logout();
  }
}
