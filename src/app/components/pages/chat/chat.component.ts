// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  joinForm: FormGroup;
  messageForm: FormGroup;
  joined = false;
  username: string;
  roomId: string = 'some-unique-room-id'; // This can be generated or assigned dynamically
  messages: { name: string; text: string }[] = [];
  typingDisplay: string;

  constructor(private fb: FormBuilder, private socketService: SocketService) {
    this.joinForm = this.fb.group({
      name: [''],
    });
    this.messageForm = this.fb.group({
      messageText: [''],
    });
  }

  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });

    this.socketService.getTypingStatus().subscribe((data) => {
      this.typingDisplay = data.isTyping ? `${data.name} is typing...` : '';
    });
  }

  join(): void {
    if (this.joinForm.valid) {
      this.username = this.joinForm.value.name;
      this.socketService.joinRoom(this.username, this.roomId);
      this.joined = true;
    }
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      const messageText = this.messageForm.value.messageText.trim();
      if (messageText) {
        this.socketService.sendMessage(messageText,this.roomId);
        this.messageForm.reset();
      }
    }
  }

  emitTyping(): void {
    this.socketService.emitTyping(true,this.roomId);
    setTimeout(() => this.socketService.emitTyping(false,this.roomId), 3000);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { SocketService } from 'src/app/services/socket.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   messages: any[] = [];
//   joined = false;
//   typingDisplay = '';
//   joinForm: FormGroup;
//   messageForm: FormGroup;
//   name:string

//   constructor(private chatService: SocketService, private fb: FormBuilder) {
//     this.joinForm = this.fb.group({
//       name: ['']
//     });

//     this.messageForm = this.fb.group({
//       messageText: ['']
//     });
//   }

//   ngOnInit() {
//     this.chatService.findAllMessages((messages) => {
//       this.messages = messages;
//     });

//     this.chatService.getMessages((message) => {
//       this.messages.push(message);
//     });

//     this.chatService.onTyping(({ name, isTyping }) => {
//       this.typingDisplay = isTyping ? `${name} is typing...` : '';
//     });
//   }

//   join() {
//     this.name = this.joinForm.get('name')?.value;
//     if (this.name) {
//       this.chatService.joinRoom(this.name);
//       this.joined = true;
//     }
//   }

//   sendMessage() {
//     let messageText = this.messageForm.get('messageText')?.value;

//     if (messageText) {
//      this.chatService.sendMessage(messageText);
//      messageText='';
//       this.messageForm.reset();
//     }
//   }

//   emitTyping() {
//     const name = this.joinForm.get('name')?.value;
//     this.chatService.emitTyping(name, true);
//     setTimeout(() => {
//       this.chatService.emitTyping(name, false);
//     }, 2000);
//   }
// }
