import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  messages:any[]=[];
  tutorsList:any[]=[];
  parentList:any[]=[];
  users:any[]=[]

  constructor(private authService:AuthService){}

  ngOnInit(): void {
      this.showMessages()
      this.getUsers()
  }
  showMessages(){
    this.authService.getMessages().subscribe({
      next:(messages=>{
        this.messages=messages.data
        return this.messages.length
      }),
      error:(error=>{
        console.log("error",error.message)
      })
    })
    
  }

  getUsers(){
    this.authService.getUsers().subscribe({
      next:(users=>{
        this.users=users
        this.tutorsList=users.filter((tutor:any)=>tutor.role === 'tutor');
        this.parentList=users.filter((parent:any)=>parent.role === 'parent');
        console.log("users",this.users)
        
      }),
      error:(error=>{
        console.log("error",error);
      
      })
    })
  }
}
