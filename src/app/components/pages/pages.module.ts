import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TutorsComponent } from './tutors/tutors.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { IncludesModule } from '../includes/includes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleTutorComponent } from './single-tutor/single-tutor.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HomeComponent,
    TutorsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    SingleTutorComponent
  
    
  ],
  imports: [
    CommonModule,
    IncludesModule,
    ReactiveFormsModule,
    IncludesModule, 
    MatIconModule, 
    CommonModule,
    

  ],
  exports:[
    HomeComponent,
    TutorsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    SingleTutorComponent
    
  ]
})
export class PagesModule { }
