import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean=false
  constructor(private formBuilder:FormBuilder,private router:Router){
    this.loginForm=this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

  }
  ngOnInit(): void {
    
  }
  onLogin(){
    this.submitted=true;
    if(this.loginForm.valid){
      const loggedUser= this.loginForm.value
      console.log('user logged in',loggedUser)
      this.loginForm.reset()
      this.router.navigate(['/'])
    }
  }
  goToSignup(){
    this.router.navigate(['/signup'])
  }
}
