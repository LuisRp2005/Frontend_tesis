import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  isLoading: boolean = false;
  loginError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    // Validar que los campos no estén vacíos
    if (!this.email || !this.contrasena) {
      this.loginError = 'Por favor, ingresa tu email y contraseña.';
      return;
    }

    this.isLoading = true; // Activar indicador de carga
    this.loginError = ''; // Limpiar cualquier mensaje de error anterior

    this.authService.login(this.email, this.contrasena).subscribe(
      (response: any) => {
        this.isLoading = false; // Desactivar indicador de carga

        if (response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/chat']); // Redirigir a la página de chat
        }
      },
      (error) => {
        this.isLoading = false; // Desactivar indicador de carga
        console.error('Error de login', error);
        this.loginError = 'Hubo un error al intentar iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
}
