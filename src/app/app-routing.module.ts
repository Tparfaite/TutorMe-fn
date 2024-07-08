import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { TutorsComponent } from './components/pages/tutors/tutors.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { SingleTutorComponent } from './components/pages/single-tutor/single-tutor.component';
import { TutorLoggedInComponent } from './components/pages/tutor-logged-in/tutor-logged-in.component';
import { ExamPageComponent } from './components/pages/exam-page/exam-page.component';
import { UpdateProfileComponent } from './components/pages/update-profile/update-profile.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { TutorDashboardComponent } from './components/pages/tutor-dashboard/tutor-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './components/pages/forbidden/forbidden.component';
import { AllUsersComponent } from './components/pages/all-users/all-users.component';
import { MessagesComponent } from './components/pages/messages/messages.component';
import { OverviewComponent } from './components/pages/overview/overview.component';
import { ChatComponent } from './components/pages/chat/chat.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'tutors', component:TutorsComponent},
  {path:'contact', component:ContactComponent},
  {path:'singleTutor', component: SingleTutorComponent},
  {path:'loggedTutor', component: TutorLoggedInComponent},
  {path:'tutor/examPage', component: ExamPageComponent},
  {path:'tutor/updateProfile', component:UpdateProfileComponent, canActivate: [AuthGuard],
  data: { role: 'tutor' },},
  {path:'adminDashboard', component: AdminDashboardComponent,canActivate: [AuthGuard],
  data: { role: 'admin' },
    children: [
      {path:'', component: OverviewComponent},
      {path:'allUsers',component:AllUsersComponent},
      {path:'messages',component:MessagesComponent}
    ]
  },
  {path:'tutorDashboard', component: TutorDashboardComponent,canActivate: [AuthGuard],
  data: { role: 'tutor' },},
  {path: 'forbidden', component:ForbiddenComponent},
  {path:'chat',component:ChatComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
