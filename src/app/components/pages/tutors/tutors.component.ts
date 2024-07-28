import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserDto, UpdateProfileDto } from 'src/app/models/user.model';
import { debounceTime } from 'rxjs';
import { TutorSearchService } from 'src/app/services/tutor-search.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  
 
  userId:number;
  tutorProfile:CreateUserDto[]=[];
  
  searchForm: FormGroup;
  profileData:any
  filteredTutors: any[] = [];


  @Output() getClickedTutor = new EventEmitter<CreateUserDto>();
  
 
  
  constructor(
    private authService:AuthService,
    private searchTutorService: TutorSearchService,
    private fb:FormBuilder,
    private toastr:ToastrService
    ){
      this.searchForm = this.fb.group({
        search:['']
      })
    }

 ngOnInit(): void {
  this.getUpdatedTutors()
  
  this.listenToSearchInput()
 }

 
getUpdatedTutors(){
  this.authService.getUsers().subscribe({
   
    next:(tutors=>{
      
      const tutorsList=tutors.filter((tutor:any)=>tutor.role === 'tutor');
      const listOfTutors=tutorsList.filter((tutor:any)=>tutor.userProfile !== null)

      this.profileData = listOfTutors.map((tutor: any) => 
      this.tutorProfile=tutor,
      );
      return this.profileData
      
    }),error:(error=>{
      console.log("error occured while fetching tutors",error)
    })
  })
}
 
 

 

 searchTutors(query: string): void {
  console.log('query', query);
  this.searchTutorService.searchTutors(query).subscribe({
    next: (tutors) => {
      const tutorsList=tutors.filter((tutor:any)=>tutor.role === 'tutor');
      const listOfTutors=tutorsList.filter((tutor:any)=>tutor.userProfile !== null)
      this.filteredTutors = listOfTutors;
      this.profileData = this.filteredTutors; 
    },
    error: (error) => {
      console.log('Error fetching searched tutors', error);
    },
  });
}


listenToSearchInput() {
  this.searchForm.get('search')?.valueChanges.pipe(debounceTime(300)).subscribe(query => {
    if (query) {
      this.searchTutors(query);
    } else {
      this.getUpdatedTutors() 
    }
  });
}



favoriteClicked(tutorId:number){
  const token = this.authService.getToken();
  if(token){
    const userId = this.authService.decodedUser().id;
    this.authService.addTutorLike(userId,tutorId).subscribe({
      next:(result=>{
        console.log("result sub",result);
        this.getUpdatedTutors();
      }),
      error:(error=>{
        console.log("error for like",error.message)
      })
    });
    console.log("hello logged",userId)
  }else{
   this.toastr.error("Login first")
  }

 
}

getSingleUser(phoneNumber: string): void {
  const token = this.authService.getToken();
  if(token){
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }else{
    this.toastr.error("Login first")
  }
  
}



}
