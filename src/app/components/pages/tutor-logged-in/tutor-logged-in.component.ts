import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-logged-in',
  templateUrl: './tutor-logged-in.component.html',
  styleUrls: ['./tutor-logged-in.component.css']
})
export class TutorLoggedInComponent implements OnInit{
  subjectForm:FormGroup
  constructor(private formBuilder:FormBuilder, private router:Router){
    this.subjectForm=this.formBuilder.group({
      level:['',Validators.required],
      subject:['',[Validators.required]]
    })
  }
  ngOnInit(): void {
    
  }
  goToExamPage(){
    if(this.subjectForm.valid){
      const subjectFormData=this.subjectForm.value;
      console.log('this is considered to give you exam', subjectFormData);
      this.subjectForm.reset()
      this.router.navigate(['/examPage'])
    }
  }
  
}
