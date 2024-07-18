import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
 messages:any[]=[];
 wantToDelete:boolean=false;
 messageId:number;

 constructor(
  private authService:AuthService,
  private toastr:ToastrService
  ){}

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


 deleteMessage(msgId:number){
  this.wantToDelete=true;
  this.messageId=msgId
 
 }

 removeMessage(){
  if(this.messageId !== null){
    this.authService.deleteMessage(this.messageId).subscribe({
      next:(deleted=>{
        console.log('deleted message',deleted);
        this.wantToDelete=false;
        this.toastr.success("Message deleted")
        this.messages = this.messages.filter(message => message.id !== this.messageId);
      }),
      error: (error=>{
        console.log("error occured", error)
      })
    })

  }

 }
}
