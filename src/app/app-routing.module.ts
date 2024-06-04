import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { TutorsComponent } from './components/pages/tutors/tutors.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { SingleTutorComponent } from './components/pages/single-tutor/single-tutor.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'tutors', component:TutorsComponent},
  {path:'contact', component:ContactComponent},
  {path:'singleTutor', component: SingleTutorComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
