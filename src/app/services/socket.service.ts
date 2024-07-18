import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3005/');
  }

  joinRoom(name: string, roomId: string): void {
    this.socket.emit('joinRoom', { name, roomId });
  }

  sendMessage(text: string, roomId: string): void {
    this.socket.emit('createMessage', { text, roomId });
  }

  emitTyping(isTyping: boolean, roomId: string): void {
    this.socket.emit('typing', { isTyping, roomId });
  }

  getMessages(): Observable<{ name: string; text: string }> {
    return new Observable(observer => {
      this.socket.on('message', message => {
        observer.next(message);
      });
    });
  }

  getTypingStatus(): Observable<{ name: string; isTyping: boolean }> {
    return new Observable(observer => {
      this.socket.on('typing', data => {
        observer.next(data);
      });
    });
  }
}
