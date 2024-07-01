import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.css']
})
export class TutorDashboardComponent implements OnInit {
  subjectForm:FormGroup

  constructor(private formBuilder:FormBuilder){
    this.subjectForm=this.formBuilder.group({
      email:[''],
      subject:['', Validators.required],

    })
  }

  ngOnInit(): void {
      
  }

  onContinueToEXam(){}


}
