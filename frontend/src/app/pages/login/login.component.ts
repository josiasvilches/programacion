import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  
  // Formulario reactivo
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
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

  isFormValid = computed(() => this.loginForm.valid);

  // Métodos del componente
  togglePassword() {
    this.showPassword.update(show => !show);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      const { email, password, remember } = this.loginForm.value;
      
      // Simular proceso de login
      setTimeout(() => {
        console.log('Login exitoso:', { email, remember });
        this.isLoading.set(false);
        
        // Redirigir a la página principal
        this.router.navigate(['/']);
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
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
