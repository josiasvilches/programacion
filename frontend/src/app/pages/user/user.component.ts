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
      email: [user?.email || '', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
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
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 8 caracteres';
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

  // Computed para fuerza de contraseña
  passwordStrength = computed(() => {
    const password = this.passwordForm.get('newPassword')?.value || '';
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { text: 'Muy débil - Agregá más caracteres', color: 'bg-red-500' },
      { text: 'Débil - Agregá mayúsculas y números', color: 'bg-red-500' },
      { text: 'Buena - Considerá agregar símbolos', color: 'bg-yellow-500' },
      { text: 'Excelente - Contraseña muy segura', color: 'bg-green-500' }
    ];

    return {
      strength,
      level: levels[Math.max(0, strength - 1)] || levels[0],
      bars: Array.from({ length: 4 }, (_, i) => ({
        active: i < strength,
        color: strength > 0 ? levels[strength - 1].color : 'bg-gray-200'
      }))
    };
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
        email: user.email
      });
    }

    // Limpiar formulario de contraseña
    this.passwordForm.reset();
  }

  // Método para guardar perfil
  saveProfile() {
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

    this.isLoading.set(true);

    // Simular guardado
    setTimeout(() => {
      const formValues = this.profileForm.value;
      
      // Actualizar usuario a través del servicio
      this.userService.updateUser({
        fullName: formValues.fullName,
        email: formValues.email
      });

      this.isLoading.set(false);
      this.isEditing.set(false);
      this.profileForm.disable();
      this.passwordForm.reset();

      alert('Perfil actualizado correctamente!');
    }, 1000);
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
        email: user.email
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
      role: 'Cliente',
      status: 'Activo'
    });
  }

  switchToUser2() {
    this.userService.switchToUser({
      id: 2,
      fullName: 'Carlos Eduardo López',
      email: 'carlos.lopez@email.com',
      role: 'Cliente',
      status: 'Activo'
    });
  }

  switchToUser3() {
    this.userService.switchToUser({
      id: 3,
      fullName: 'Ana Sofía',
      email: 'ana.sofia@email.com',
      role: 'Cliente',
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
