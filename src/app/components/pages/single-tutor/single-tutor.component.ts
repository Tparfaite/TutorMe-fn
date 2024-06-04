import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-tutor',
  templateUrl: './single-tutor.component.html',
  styleUrls: ['./single-tutor.component.css'],
})
export class SingleTutorComponent implements OnInit {

  messageForm:FormGroup
  showMessageForm:boolean=false
  submitted:boolean=false

  constructor(private formBuilder:FormBuilder){
   this.messageForm= this.formBuilder.group({
    fullNames:['',Validators.required],
    email:['', [Validators.required, Validators.email]],
    phoneNumber:['',Validators.required],
    message:['',Validators.required]
   })
  }
  ngOnInit(): void {
    
  }
  onSendMessage(){
    this.submitted=true;
    if(this.messageForm.valid){
      const messageData= this.messageForm.value;
      this.messageForm.reset();
      console.log("message sent successful", messageData)
      this.submitted=false
    }
    
  }
  connectWithTutor(){
    this.showMessageForm=true
  }

}
