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
import { TutorLoggedInComponent } from './tutor-logged-in/tutor-logged-in.component';
import { ExamPageComponent } from './exam-page/exam-page.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TutorDashboardComponent } from './tutor-dashboard/tutor-dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RouterModule } from '@angular/router';
import { AllUsersComponent } from './all-users/all-users.component';
import { MessagesComponent } from './messages/messages.component';
import { OverviewComponent } from './overview/overview.component';
import { ExamsComponent } from './exams/exams.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    HomeComponent,
    TutorsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    SingleTutorComponent,
    TutorLoggedInComponent,
    ExamPageComponent,
    UpdateProfileComponent,
    AdminDashboardComponent,
    TutorDashboardComponent,
    ForbiddenComponent,
    AllUsersComponent,
    MessagesComponent,
    OverviewComponent,
    ExamsComponent,
    ChatComponent
  
    
  ],
  imports: [
    CommonModule,
    IncludesModule,
    ReactiveFormsModule,
    IncludesModule, 
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    RouterModule,
    NgxSpinnerModule,
   
    

  ],
  providers:[AuthService],
  exports:[
    HomeComponent,
    TutorsComponent,
    LoginComponent,
    SignupComponent,
    ContactComponent,
    SingleTutorComponent,
    TutorLoggedInComponent,
    ExamPageComponent,
    UpdateProfileComponent,
    AdminDashboardComponent,
    TutorDashboardComponent,
    ChatComponent,
    AllUsersComponent
    
    
  ]
})
export class PagesModule { }
