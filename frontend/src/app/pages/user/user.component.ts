import { Component, OnInit, computed, signal, inject } from '@angular/core';
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
}

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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
      status: user.status
    };
  });

  // Formulario reactivo
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor() {
    // Inicializar formulario con valores vacíos; se parcheará al cargar datos desde el backend
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{9,15}$/)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });

    // Deshabilitar formulario inicialmente
    this.profileForm.disable();
  }

  ngOnInit(): void {
    // Si no hay usuario logueado, redirigir al login para evitar cargar la vista sin autenticación
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Al iniciar la vista, intentar cargar los datos completos del usuario desde el backend
    this.loadFullProfile();
  }

  private async loadFullProfile() {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    const token = this.userService.getAuthToken();
    // currentUser viene tipado como User en el frontend y puede no tener "usuario_id";
    // acceder con any para mantener compatibilidad con el backend que usa usuario_id
    const userId = ((currentUser as any).usuario_id) ?? currentUser.id;
    const url = `http://localhost:5001/usuario/${userId}`;

    console.log('Cargando perfil completo:', { userId, token: !!token });

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) {
        // No bloquear la vista si falla la carga remota; mostramos lo local
        console.warn('No se pudieron obtener datos completos del usuario:', res.status);
        return;
      }

      const data = await res.json();
      console.log('Datos recibidos del backend:', data);
      
      // El backend devuelve campos en español: 'nombre', 'email', 'numero', 'rol', 'estado'
      const updated: any = {};
      if (data.nombre) updated.fullName = data.nombre;
      if (data.email) updated.email = data.email;
      if (data.numero !== undefined && data.numero !== null) updated.phone = String(data.numero);
      if (data.rol) updated.role = data.rol === 'cliente' ? 'USER' : (data.rol || undefined);
      if (data.estado) updated.status = data.estado;

      console.log('Datos actualizados para el frontend:', updated);

      // Actualizar UserService para que el resto de la app vea los datos completos
      this.userService.updateUser(updated);

      // Parchear formulario con los datos obtenidos
      this.profileForm.patchValue({
        fullName: updated.fullName || this.profileForm.get('fullName')?.value,
        email: updated.email || this.profileForm.get('email')?.value,
        phone: updated.phone || this.profileForm.get('phone')?.value
      });
      
      console.log('Formulario actualizado con valores:', this.profileForm.value);
    } catch (error) {
      console.error('Error cargando perfil completo:', error);
    }
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
    const newPassword = this.passwordForm.get('newPassword')?.value;
    // Solo mostrar error si está intentando cambiar la contraseña
    if (newPassword && control?.touched && !control?.value) {
      return 'La contraseña actual es requerida para cambiarla';
    }
    return null;
  });

  newPasswordError = computed(() => {
    const control = this.passwordForm.get('newPassword');
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    // Solo mostrar error si ingresó la contraseña actual
    if (currentPassword && control?.touched && !control?.value) {
      return 'La nueva contraseña es requerida';
    }
    return null;
  });

  confirmPasswordError = computed(() => {
    const control = this.passwordForm.get('confirmPassword');
    const newPassword = this.passwordForm.get('newPassword')?.value;
    if (newPassword && control?.touched) {
      if (!control?.value) return 'Confirmá tu nueva contraseña';
      if (control.errors?.['passwordMismatch']) return 'Las contraseñas no coinciden';
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
    console.log('Estado del formulario:', {
      valid: this.profileForm.valid,
      invalid: this.profileForm.invalid,
      values: this.profileForm.value,
      errors: this.profileForm.errors
    });
    
    if (this.profileForm.invalid) {
      console.error('Formulario inválido. Errores por campo:');
      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key);
        if (control?.errors) {
          console.error(`Campo ${key}:`, control.errors);
        }
      });
      this.profileForm.markAllAsTouched();
      alert('Por favor completá todos los campos requeridos correctamente');
      return;
    }

    // Validar contraseña SOLO si el usuario quiere cambiarla
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    
    if (newPassword || currentPassword || confirmPassword) {
      // Si ingresó algo en contraseñas, validar que estén completos todos los campos
      if (!currentPassword) {
        alert('Debés ingresar tu contraseña actual para cambiarla');
        return;
      }
      if (!newPassword) {
        alert('Debés ingresar una nueva contraseña');
        return;
      }
      if (!confirmPassword) {
        alert('Debés confirmar tu nueva contraseña');
        return;
      }
      if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      alert('No hay usuario logueado');
      return;
    }

    // Construir payload - SIEMPRE enviar todos los campos del formulario
    const formValues = this.profileForm.value;
    const payload: any = {};
    
    // Siempre incluir los campos básicos si están en el formulario
    if (formValues.fullName) payload.fullName = formValues.fullName;
    if (formValues.email) payload.email = formValues.email;
    if (formValues.phone) payload.numero = formValues.phone; // El backend espera "numero"
    if (newPassword) payload.password = newPassword;

    console.log('Datos del formulario:', formValues);
    console.log('Usuario actual:', currentUser);
    console.log('Payload a enviar:', payload);
    console.log('Comparación phone:', {
      form: formValues.phone,
      current: currentUser.phone,
      diferentes: formValues.phone !== currentUser.phone
    });

    // Si no hay campos en el payload, salir
    if (Object.keys(payload).length === 0) {
      alert('No hay datos para guardar');
      return;
    }

    this.isLoading.set(true);

    try {
      const token = this.userService.getAuthToken();
      // Usar usuario_id si está disponible, sino id
      const userId = ((currentUser as any).usuario_id) ?? currentUser.id;
      const url = `http://localhost:5001/usuario/${userId}`;

      console.log('Enviando petición PUT a:', url);
      console.log('Token presente:', !!token);
      console.log('Payload:', payload);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      console.log('Respuesta status:', res.status);

      if (!res.ok) {
        let errorMsg = 'Error al actualizar el usuario.';
        try {
          const err = await res.json();
          console.error('Error del servidor:', err);
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

  logout() {
    this.userService.logout();
  }
}
