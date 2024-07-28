import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
 
})
export class HeaderComponent implements OnInit {
  isLogged:boolean=false;
  showSignup:boolean=false;
  showLogin:boolean=false

 constructor(
  private authService:AuthService, 
  private router:Router,
  private spinner: NgxSpinnerService,
  private toastr:ToastrService
  ){}

 ngOnInit(): void {
  
}
isLoggedIn():boolean{
  return this.authService.isLoggedIn()
}


logout(){
  this.spinner.show()
  this.authService.logout().subscribe({
    next:()=>{
      setTimeout(()=>{
        this.spinner.hide()
        this.toastr.success("You logged out")
        this.router.navigate(['/login'])

      },500)
    }, error:(error=>{
      setTimeout(()=>{
        this.spinner.hide()
        this.toastr.error("Logout failed")
      },500)

    })
  })
}

}
