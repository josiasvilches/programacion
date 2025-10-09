import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  const currentUser = userService.getCurrentUser();
  
  // Verificar si el usuario existe y tiene rol de Admin o Empleado
  if (currentUser && (currentUser.role === 'Admin' || currentUser.role === 'Empleado')) {
    return true;
  }
  
  // Si no tiene permisos, redirigir a la página principal con mensaje
  console.warn('Acceso denegado: Solo usuarios Admin y Empleado pueden acceder al panel');
  router.navigate(['/'], { 
    queryParams: { 
      error: 'access_denied',
      message: 'No tienes permisos para acceder al panel de administración' 
    }
  });
  
  return false;
}; 