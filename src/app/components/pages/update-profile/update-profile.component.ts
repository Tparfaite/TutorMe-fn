import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
updateProfile: FormGroup
image:any
constructor(private formBuilder:FormBuilder){
  this.updateProfile=this.formBuilder.group({
    level: ['',Validators.required],
    subject: ['',Validators.required],
    imageUrl:['',Validators.required],
    Description:['',Validators.required],
    interest:['']
  })
}
ngOnInit(): void {
  
}

}
