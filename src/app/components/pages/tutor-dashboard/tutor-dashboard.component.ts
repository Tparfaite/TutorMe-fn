import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {
  subjectForm:FormGroup;
  loggedUserEmail:string=''


  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private examService:ExamService,
    private spinner:NgxSpinnerService
    ){
    this.subjectForm=this.formBuilder.group({
      email:[''],
      level:['',Validators.required],
      domain:['', Validators.required],

    })
  }

  ngOnInit(): void {
      this.getLoggedUserEmail()
  }

 getLoggedUserEmail(){
   const loggedUser=this.authService.decodedUser();
   this.loggedUserEmail=loggedUser.email
   
   return loggedUser
 }
  onContinueToEXam(){
    if(this.subjectForm.valid){
      this.spinner.show();
      const subjectFormData={
        email:this.loggedUserEmail,
        level:this.subjectForm.value.level,
        domain:this.subjectForm.value.domain
      }
      
      console.log("subject form data", subjectFormData);
      this.examService.setFormData(subjectFormData)
      setTimeout(()=>{
        this.spinner.hide()
        this.router.navigate(['/tutor/examPage'])
      },1000)
      

    }

  }


}
