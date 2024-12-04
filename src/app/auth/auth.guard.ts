// src/app/auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';  // Asegúrate de tener el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authService.isAuthenticated()) {
        return true;  // Permite el acceso a la ruta
      } else {
        this.router.navigate(['/login']);  // Redirige a login si no está autenticado
        return false;
      }
  }
}
