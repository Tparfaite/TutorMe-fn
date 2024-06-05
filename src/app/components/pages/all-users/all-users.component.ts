import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users:any[]=[]

  constructor(private authService:AuthService, private router:Router){}
  ngOnInit(): void {
      this.showUSers()
  }



  showUSers(){
    this.authService.getUsers().subscribe({
      next:(users=>{
        this.users=users
        console.log("users to be in table",users)
      }),
      error:(error)=>{
        console.log("error occured while fetching users",error);
        if(error.status === 401){
          this.router.navigate(['/login'])
        }
      }
    })
  }
  deleteUser(id:number){

  }
}
