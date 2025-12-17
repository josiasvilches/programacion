import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // Verificar si el usuario está logueado
  if (userService.isLoggedIn()) {
    return true;
  }

  // Si no está logueado, redirigir al login
  console.warn('Acceso denegado: Debes iniciar sesión para acceder a esta página');
  router.navigate(['/login'], {
    queryParams: {
      returnUrl: state.url,
      message: 'Debes iniciar sesión para acceder a esta página'
    }
  });

  return false;
};
