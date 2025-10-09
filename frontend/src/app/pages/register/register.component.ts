import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  ,
  styles: [
    `
    .smooth-transition {
      transition: all 0.3s ease;
    }
    
    .error-bounce {
      animation: bounce 0.5s ease-in-out;
    }
    
    .success-fade {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -8px, 0);
      }
      70% {
        transform: translate3d(0, -4px, 0);
      }
      90% {
        transform: translate3d(0, -2px, 0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    `
  ]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);

  // Signals para el estado del componente
  isLoading = signal(false);
  showPassword = signal(false);
  // Mantener errores por campo que vienen del servidor
  serverErrors = signal<Record<string, string>>({});
  // Mensajes de banner iguales al login
  formTouched = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Formulario reactivo
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Computed para validaciones (muestran errores solo después del primer intento / interacción)
  nameError = computed(() => {
    const control = this.registerForm.get('name');
    if ((control?.touched || this.formTouched()) && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu nombre';
      if (control.errors['minlength']) return 'El nombre debe tener al menos 2 caracteres';
    }
    // Priorizar errores retornados por el servidor
    return this.serverErrors()['name'] || null;
  });

  emailError = computed(() => {
    const control = this.registerForm.get('email');
    if ((control?.touched || this.formTouched()) && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu email';
      if (control.errors['email']) return 'Por favor ingresá un email válido';
    }
    return this.serverErrors()['email'] || null;
  });

  phoneError = computed(() => {
    const control = this.registerForm.get('phone');
    if ((control?.touched || this.formTouched()) && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu número de teléfono';
      if (control.errors['pattern']) return 'Por favor ingresá un número de teléfono válido';
    }
    return this.serverErrors()['phone'] || null;
  });

  passwordError = computed(() => {
    const control = this.registerForm.get('password');
    if ((control?.touched || this.formTouched()) && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu contraseña';
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 6 caracteres';
    }
    return this.serverErrors()['password'] || null;
  });

  // Computed para verificar si el formulario es válido
  isFormValid = computed(() => this.registerForm.valid);

  // Computed para permitir envío (mismo comportamiento que login)
  canSubmit = computed(() => !this.isLoading());

  // Método para toggle password visibility
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  // Método para enviar el formulario
  onSubmit() {
    // Limpiar mensajes previos
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.isLoading()) return;

    // Marcar todos los campos como touched para mostrar errores
    this.markFormGroupTouched();

    // Validaciones básicas (mismo estilo que en login)
    const { name, email, password, phone } = this.registerForm.value;
    if (!name || !name.trim()) {
      this.errorMessage.set('El nombre es obligatorio');
      return;
    }

    if (!email || !email.trim()) {
      this.errorMessage.set('El email es obligatorio');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      this.errorMessage.set('Por favor ingresá un email válido (ej: nombre@dominio.com)');
      return;
    }

    if (!password || password.length < 6) {
      this.errorMessage.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Phone pattern ya lo valida el control; si no es válido, mostrar mensaje genérico
    const phoneControl = this.registerForm.get('phone');
    if (phoneControl && phoneControl.errors) {
      this.errorMessage.set('Por favor ingresá un número de teléfono válido');
      return;
    }

    this.isLoading.set(true);
    this.serverErrors.set({});

    (async () => {
      const payload = {
        nombre: name.trim(),
        email: email.trim(),
        password,
        numero: phone
      };

      try {
        const res = await this.userService.register(payload);
        if (res.success) {
          this.successMessage.set(res.message || 'Registro exitoso');
          // Navegar al login luego de mostrar el mensaje
          setTimeout(() => this.router.navigate(['/login']), 1200);
        } else {
          // Si el backend devuelve errores por campo, mostrarlos inline y banner
          if (res.data && typeof res.data === 'object') {
            const fieldErrors: Record<string, string> = {};
            if (res.data.errors) Object.assign(fieldErrors, res.data.errors);
            // Mapear numero -> phone si viene así
            if (fieldErrors['numero'] && !fieldErrors['phone']) {
              fieldErrors['phone'] = fieldErrors['numero'];
            }
            this.serverErrors.set(fieldErrors);
          }

          this.errorMessage.set(res.message || 'Error en el registro');
        }
      } catch (err) {
        console.error('Error en register:', err);
        this.errorMessage.set('Error de conexión. Verificá tu conexión e intentá nuevamente.');
      } finally {
        this.isLoading.set(false);
      }
    })();
  }

  // Método para navegar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para ir al home
  goHome() {
    this.router.navigate(['/']);
  }

  // Método para marcar todos los campos como touched
  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
    this.formTouched.set(true);
  }
}
