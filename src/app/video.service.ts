// src/app/video.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service'; // Asegúrate de que tienes el AuthService para manejo de autenticación

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000/api/videos'; // URL de tu API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener los videos
  getVideos() {
    return this.http.get(this.apiUrl, {
      headers: this.authService.getHeaders()  // Se agregan los encabezados de autenticación
    });
  }
}
