import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  users:any[]=[];
  userId:number ;
  isEditModalVisible:boolean=false;
  wantToDelete:boolean=false;
  updateUserForm:FormGroup

  constructor(
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder
    ){
      this.updateUserForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber:['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', Validators.required],
        province: ['', Validators.required],
        district: ['', Validators.required],
        sector: ['', Validators.required],
      });
    }
  ngOnInit(): void {
      this.showUSers();
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
    this.wantToDelete=true;
    this.userId=id;
    console.log("it's clicked")
  }

  removeUser(){
    if(this.userId !== null){
      this.authService.deleteUser(this.userId).subscribe({
        next:(result=>{
          this.users =  this.users.filter((user:any)=>user.id !== this.userId);
          this.toastr.success("User deleted");
          this.wantToDelete = false;
          

          console.log("user remainin after deleting", this.users)
        }),
        error:(error=>{
          console.log("error",error)
        })
      })
    }
   
  }


  editUser(user:any){
    this.userId=user.id;
    this.updateUserForm.setValue({
      firstName:user.firstName,
      lastName:user.lastName,
      phoneNumber:user.phoneNumber,
      email:user.email,
      gender:user.gender,
      province:user.province,
      district:user.district,
      sector:user.sector
    })
   this.isEditModalVisible=true
  }

  updateUser(){
    if(this.updateUserForm.valid){
      this.authService.updateUser(this.userId,this.updateUserForm.value).subscribe({
        next:(updated=>{
          const index = this.users.findIndex(user => user.id === this.userId);
          if (index !== -1) {
            this.users[index] = updated; // Assuming updatedUser has the new data
          }
        }),
        error:(error=>{
          console.log("error",error)
          return error
        })
      });
      this.isEditModalVisible=false;
      this.toastr.success("user updated!")
    }
   
  }
}
