// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si el token existe
  }

  // Obtener los headers con el token de autenticación
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  }

  // Método para hacer login
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, contrasena }).pipe(
      catchError((error) => {
        console.error('Error de login', error);
        throw error; // Propaga el error al componente
      })
    );
  }

  // Método para hacer logout
  logout(): void {
    localStorage.removeItem('token');
  }

  // Método para obtener el token almacenado (si es necesario)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para almacenar el token (si es necesario)
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
