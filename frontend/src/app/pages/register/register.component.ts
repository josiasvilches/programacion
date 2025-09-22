import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Signals para el estado del componente
  isLoading = signal(false);
  showPassword = signal(false);

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

  // Computed para validaciones
  nameError = computed(() => {
    const control = this.registerForm.get('name');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu nombre';
      if (control.errors['minlength']) return 'El nombre debe tener al menos 2 caracteres';
    }
    return null;
  });

  emailError = computed(() => {
    const control = this.registerForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu email';
      if (control.errors['email']) return 'Por favor ingresá un email válido';
    }
    return null;
  });

  phoneError = computed(() => {
    const control = this.registerForm.get('phone');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu número de teléfono';
      if (control.errors['pattern']) return 'Por favor ingresá un número de teléfono válido';
    }
    return null;
  });

  passwordError = computed(() => {
    const control = this.registerForm.get('password');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Por favor ingresá tu contraseña';
      if (control.errors['minlength']) return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  });

  // Computed para verificar si el formulario es válido
  isFormValid = computed(() => this.registerForm.valid);

  // Método para toggle password visibility
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.registerForm.valid && !this.isLoading()) {
      this.isLoading.set(true);

      // Simular proceso de registro
      setTimeout(() => {
        const formData = this.registerForm.value;
        console.log('Datos de registro:', formData);
        
        // Aquí harías la llamada al servicio de registro
        alert(`¡Registro exitoso! Bienvenido ${formData.name}`);
        
        this.isLoading.set(false);
        
        // Redirigir al login o home
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.registerForm.markAllAsTouched();
    }
  }

  // Método para navegar al login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para ir al home
  goHome() {
    this.router.navigate(['/']);
  }
}
