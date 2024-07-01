import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserDto } from 'src/app/models/user.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  
  

  tutors:CreateUserDto[]=[];


  @Output() getClickedTutor = new EventEmitter<CreateUserDto>();
  
  viewingMoreAbout:boolean=false;
  
  constructor(private authService:AuthService){}
 ngOnInit(): void {
  this.showAllTutors()
 }
showAllTutors(){
  this.authService.getUsers().subscribe({
    next:(tutors=>{
      this.tutors=tutors.filter((tutor:any)=>tutor.role === 'tutor')
      console.log("present tutors",tutors)
    })
  })
}
 
 viewingMore(tutorId:number,tutor:any){
  this.viewingMoreAbout=true;
  const tutorrToView=tutor
  this.getClickedTutor=tutorrToView
 console.log("Tutor to view", tutorId,tutor)
 }




}
