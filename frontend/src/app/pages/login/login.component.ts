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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  // Signals para el estado del componente
  isLoading = signal(false);
  showPassword = signal(false);
  formTouched = signal(false);
  
  // Formulario reactivo
  loginForm: FormGroup;

  // Inyectar servicios
  private userService = inject(UserService);

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });

    // Escuchar cambios en el formulario para actualizar el signal
    this.loginForm.valueChanges.subscribe(() => {
      this.formTouched.set(true);
    });
  }

  // Computed values para validación
  emailError = computed(() => {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.invalid && emailControl?.touched) {
      if (emailControl.errors?.['required']) {
        return 'El email es requerido';
      }
      if (emailControl.errors?.['email']) {
        return 'Por favor ingresá un email válido';
      }
    }
    return null;
  });

  passwordError = computed(() => {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.invalid && passwordControl?.touched) {
      if (passwordControl.errors?.['required']) {
        return 'La contraseña es requerida';
      }
      if (passwordControl.errors?.['minlength']) {
        return 'La contraseña debe tener al menos 6 caracteres';
      }
    }
    return null;
  });

  isFormValid = computed(() => {
    // Forzar re-evaluación cuando formTouched cambia
    this.formTouched();
    return this.loginForm.valid;
  });

  // Métodos del componente
  togglePassword() {
    this.showPassword.update(show => !show);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      const { email, password, remember } = this.loginForm.value;
      
      // Llamar al backend real
      this.userService.login({ email, password }).then((result) => {
        console.log('Resultado del login:', result);
        
        if (result.success) {
          console.log('Login exitoso:', result.message);
          // Redirigir a la página principal
          this.router.navigate(['/']);
        } else {
          console.error('Error en login:', result.message);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
        
        this.isLoading.set(false);
      }).catch((error) => {
        console.error('Error en login:', error);
        this.isLoading.set(false);
      });
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      this.formTouched.set(true);
    }
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
    const control = this.loginForm.get(fieldName);
    const baseClasses = 'w-full px-4 py-3 rounded-lg input-focus smooth-transition';
    
    if (control?.invalid && control?.touched) {
      return `${baseClasses} border-red-500`;
    }
    
    return `${baseClasses} border border-gray-300`;
  }
}
