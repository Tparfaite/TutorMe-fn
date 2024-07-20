import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  submitted:boolean=false;
  isLoading:boolean=false

  constructor(private formBuilder:FormBuilder, 
    private router:Router, 
    private authService:AuthService,
    private spinner:NgxSpinnerService,
    private toastr: ToastrService
    ){
    this.signupForm=this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['',[Validators.required]],
      province: ['',[Validators.required]],
      district: ['',[Validators.required]],
      sector: ['',[Validators.required]],
      role: ['',[Validators.required]],
      gender: ['',[Validators.nullValidator]],
      password: ['', [Validators.required]]
    })
  }
 ngOnInit(): void {
   
 }
 onSignup(){
  this.submitted=true;
  if(this.signupForm.valid){
    this.isLoading=true;
    this.spinner.show()
    const formdata=this.signupForm.value
    console.log("this is formdata",formdata)
    this.authService.createUser(formdata).subscribe({
      next:(response=>{
        // if(response){
        //   this.spinner.hide();
        //   this.isLoading=false;
        //   this.signupForm.reset();
        //   this.toastr.success('Account registered successful')
        //   this.router.navigate(['/login'])
        // }
        setTimeout(()=>{
        this.spinner.hide();
        this.isLoading=false;
        this.signupForm.reset();
        this.toastr.success('Account registered successful')
        this.router.navigate(['/login'])
        },500)
        console.log("this is response",response)
      }), error:(error=>{
        setTimeout(()=>{
          this.toastr.error(error.message)
            console.log('Signup failed', error.message);
            this.isLoading = false;
            this.spinner.hide();
        },700)
        throw error.message
      })
    })
    
    
    this.submitted=false
   
  }
  return 
 
 }
 goToLoginPage(){
  this.router.navigate(['/login'])
 }
}
