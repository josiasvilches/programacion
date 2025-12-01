import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  // Verificar si el usuario tiene permisos (ADMIN o TRABAJADOR)
  if (userService.hasAdminPermissions()) {
    return true;
  }
  
  // Si no tiene permisos, redirigir a la página principal con mensaje
  console.warn('Acceso denegado: Solo usuarios ADMIN y TRABAJADOR pueden acceder al panel');
  router.navigate(['/'], { 
    queryParams: { 
      error: 'access_denied',
      message: 'No tienes permisos para acceder al panel de administración' 
    }
  });
  
  return false;
};