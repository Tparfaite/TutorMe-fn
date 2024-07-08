import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  messages:any;
  users:any
  constructor(
    private router:Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
     ){}
  ngOnInit(): void {
      
  }



  returnHome(){
    this.router.navigate(['/'])
  }

  deleteMessage(id:number){

  }

  showMessages(){
    this.users=null
    this.authService.getMessages().subscribe({
      next:(messages=>{
        this.messages=messages.data
        console.log('all messages ava',messages)
      })
    })
  }

  showUSers(){
    this.messages=null
    this.authService.getUsers().subscribe({
      next:(users=>{
        this.users=users
        console.log("users to be in table",users)
      })
    })
  }

  logout(){
    this.spinner.show()
    this.authService.logout().subscribe({
      next:()=>{
        setTimeout(()=>{
          this.spinner.hide()
          this.toastr.success("You logged out")
          this.router.navigate(['/login'])
  
        },1000)
      }, error:(error=>{
        setTimeout(()=>{
          this.spinner.hide()
          this.toastr.error(error.message)
        },1000)
  
      })
    })
  }

}
