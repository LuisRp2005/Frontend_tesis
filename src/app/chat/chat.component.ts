// src/app/chat/chat.component.ts

import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Router } from '@angular/router'; // Importa Router para redirección
import { AuthService } from '../auth.service'; // Asegúrate de tener un servicio de autenticación

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageInput: string = '';
  messages: { text: string, sender: string }[] = [];
  botResponses: { [key: string]: string } = {
    "hola": "¡Hola! ¿En qué puedo ayudarte?",
    "cómo estás": "Estoy aquí para ayudarte, ¿qué necesitas?",
    "adiós": "¡Hasta luego! Cuídate.",
    "qué es javascript": "JavaScript es un lenguaje de programación usado principalmente en la web para crear páginas interactivas.",
    "gracias": "¡De nada! Estoy para ayudarte."
  };
  videos: any[] = [];

  constructor(
    private videoService: VideoService,
    private router: Router, // Inyecta Router para redirigir
    private authService: AuthService // Inyecta AuthService para manejar el logout
  ) {}

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(
      (response: any) => {
        this.videos = response.videos;
      },
      (error) => {
        console.error('Error al obtener los videos', error);
      }
    );
  }

  // Función para enviar mensaje
  sendMessage() {
    const message = this.messageInput.trim();
    if (message) {
      this.addMessage(message, 'user');
      const botReply = this.getBotResponse(message);
      this.addMessage(botReply, 'bot');
      this.speakText(botReply);
      this.messageInput = '';
    }
  }

  // Función de logout
  logout() {
    this.authService.logout(); // Llamamos al método logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirigimos al login o página de inicio
  }

  getBotResponse(userMessage: string): string {
    userMessage = userMessage.toLowerCase();
    for (const keyword in this.botResponses) {
      if (userMessage.includes(keyword)) {
        return this.botResponses[keyword];
      }
    }
    return "Lo siento, no entiendo esa pregunta.";
  }

  addMessage(text: string, sender: string) {
    this.messages.push({ text, sender });
  }

  speakText(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);
  }

  startVoiceRecognition() {
    const recognition = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.messageInput = transcript;
    };

    recognition.onerror = (event: any) => {
      console.error('Error de reconocimiento de voz:', event.error);
    };
  }
}
