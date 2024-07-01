import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserDto, UpdateProfileDto } from 'src/app/models/user.model';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  
  userProfileDto:UpdateProfileDto

  tutorProfile:CreateUserDto[]=[];
  



  @Output() getClickedTutor = new EventEmitter<CreateUserDto>();
  
  viewingMoreAbout:boolean=false;
  
  constructor(private authService:AuthService){}

 ngOnInit(): void {
  this.getUpdatedTutors()
 }
getUpdatedTutors(){
  this.authService.getUsers().subscribe({
    next:(tutors=>{
      const tutorsList=tutors.filter((tutor:any)=>tutor.role === 'tutor')
      this.tutorProfile=tutorsList.filter((tutor:any)=>tutor.userProfile !== null)
      const profileData = this.tutorProfile.map((tutor: any) => 
      this.userProfileDto= tutor.userProfile,
      
      
      );
      
      
      console.log("User profiles with images:", this.tutorProfile);
      console.log("User profiles with images userProfileDto:", this.userProfileDto);
      
      
      console.log("user profileeeeee",profileData)
      return profileData
      
    })
  })
}
 
 viewingMore(tutorId:number,tutor:any){
  this.viewingMoreAbout=true;
  const tutorrToView=tutor
  this.getClickedTutor=tutorrToView
 console.log("Tutor to view", tutorId,tutor)
 }

 searchTutors(){}




}
