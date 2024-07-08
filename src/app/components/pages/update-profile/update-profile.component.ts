import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup
imageUrl:any;
userId:number;
subjectFormData:any;


constructor(
  private formBuilder:FormBuilder,
  private examService:ExamService,
  private http: HttpClient,
  private authService:AuthService,
  private spinner:NgxSpinnerService,
  private toastr:ToastrService,
  private router:Router
  ){
  this.updateProfileForm=this.formBuilder.group({
    level: ['',Validators.required],
    domain: ['',Validators.required],
    imageUrl:['',Validators.required],
    description:['',Validators.required],
    otherInterest:['']
  })
}
ngOnInit(): void {
 this.subjectFormData= this.examService.getFormData();
 console.log("ddddd",this.subjectFormData)
}

onFileSelected(event:any){
  const file:File=event.target.files[0];
  this.uploadImage(file).subscribe((imageUrl:any)=>{
    this.imageUrl=imageUrl.secure_url;
    console.log('imageUrl',this.imageUrl)
  })

}


uploadImage(file: File){
  const formData=new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'myDocs');
  return this.http.post<any>('https://api.cloudinary.com/v1_1/dkeo0pa4b/image/upload', formData)
}             

getLoggedUserId(){
 return this.authService.decodedUser()
}

updateUserProfile(id:number){

  if(this.updateProfileForm && this.imageUrl){
    this.spinner.show();
    const {level, domain}=this.examService.getFormData()
   const userProfile=this.updateProfileForm.value;
   userProfile.imageUrl= this.imageUrl;
   userProfile.level=level;
   userProfile.domain=domain;

   this.userId=this.getLoggedUserId().id;

   this.authService.createUserProfile(this.userId,userProfile).subscribe({
    next:(userProfileCreated=>{
      if(userProfileCreated){
        setTimeout(()=>{
          this.spinner.hide();
          this.toastr.success("Profile updated!");
          this.updateProfileForm.reset()
          setTimeout(()=>{
           this.router.navigate(['/'])
          },3000)
        },1000)
       
      }
      
    }),error:(error=>{
      setTimeout(()=>{
       this.spinner.hide();
       this.toastr.error("Profile update failed");

      },1000)
      console.log("error occured while creating user Profile",error)
    })
   })

  }
  
  
  
  
}


}
