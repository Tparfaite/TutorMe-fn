import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
 messages:any[]=[]

 constructor(private authService:AuthService){}

 ngOnInit(): void {
     this.showMessages()
 }
 showMessages(){
  this.authService.getMessages().subscribe({
    next:(messages=>{
      this.messages=messages.data
      console.log('all messages ava',messages)
    })
  })
 }


 deleteMessage(id:number){}
}
