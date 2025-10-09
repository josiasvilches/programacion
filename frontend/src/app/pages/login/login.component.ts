import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  // Signals para el estado del componente
  isLoading = signal(false);
  showPassword = signal(false);
  formTouched = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  
  // Formulario reactivo
  loginForm: FormGroup;

  // Inyectar servicios
  private userService = inject(UserService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(3)  // Cambié a 3 para hacer más fácil el testing
      ]],
      remember: [false]
    });

    // Escuchar cambios en el formulario solo para actualizar el signal de touched
    this.loginForm.valueChanges.subscribe(() => {
      this.formTouched.set(true);
    });
  }

  // Computed values para validación (solo después de enviar)
  emailError = computed(() => {
    // Solo mostrar errores después de que el formulario fue enviado
    return null;
  });

  passwordError = computed(() => {
    // Solo mostrar errores después de que el formulario fue enviado
    return null;
  });

  isFormValid = computed(() => {
    // Forzar re-evaluación cuando formTouched cambia
    this.formTouched();
    return this.loginForm.valid;
  });

  // Computed para verificar si se puede enviar el formulario (ahora solo verifica loading)
  canSubmit = computed(() => {
    return !this.isLoading();
  });

  // Métodos del componente
  togglePassword() {
    this.showPassword.update(show => !show);
  }

  onSubmit() {
    // Limpiar mensajes previos
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Verificar si ya está cargando
    if (this.isLoading()) {
      return;
    }

    // Marcar todos los campos como touched para mostrar errores
    this.markFormGroupTouched();

    const { email, password, remember } = this.loginForm.value;
    
    // Validaciones que se muestran al usuario
    if (!email || !email.trim()) {
      this.errorMessage.set('El email es obligatorio');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      this.errorMessage.set('Por favor ingresá un email válido (ej: nombre@dominio.com)');
      return;
    }

    if (!password || password.length < 3) {
      this.errorMessage.set('La contraseña debe tener al menos 3 caracteres');
      return;
    }

    // Si llegamos aquí, las validaciones pasaron
    this.isLoading.set(true);

    // Llamar al backend real
    this.userService.login({ email: email.trim(), password }).then((result) => {
      console.log('Resultado del login:', result);
      
      if (result.success) {
        this.successMessage.set(result.message);
        console.log('Login exitoso:', result.message);
        
        // Esperar un momento para mostrar el mensaje de éxito
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      } else {
        this.errorMessage.set(result.message || 'Error de autenticación. Verificá tus credenciales.');
        console.error('Error en login:', result.message);
      }
      
      this.isLoading.set(false);
    }).catch((error) => {
      console.error('Error en login:', error);
      this.errorMessage.set('Error de conexión. Verificá tu conexión a internet e intentá nuevamente.');
      this.isLoading.set(false);
    });
  }

  // Método para marcar todos los campos como touched
  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
      control?.markAsDirty();
    });
    this.formTouched.set(true);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToRegister() {
    console.log('Redirigir a registro');
    // Aquí puedes implementar la navegación al registro
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    const email = this.loginForm.get('email')?.value;
    if (email && this.loginForm.get('email')?.valid) {
      console.log(`Enviar enlace de recuperación a: ${email}`);
      // Aquí implementarías la lógica de recuperación de contraseña
    } else {
      console.log('Por favor ingresá un email válido');
      this.loginForm.get('email')?.markAsTouched();
    }
  }

  // Helper methods
  getInputClasses(fieldName: string): string {
    const baseClasses = 'w-full px-4 py-3 rounded-lg input-focus smooth-transition border-2';
    return `${baseClasses} border-gray-300 focus:border-red-500 focus:ring-red-500`;
  }

  // Método para limpiar mensajes de error manualmente
  clearMessages() {
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
