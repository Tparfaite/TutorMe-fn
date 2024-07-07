import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserDto, UpdateProfileDto } from 'src/app/models/user.model';
import { debounceTime } from 'rxjs';
import { TutorSearchService } from 'src/app/services/tutor-search.service';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  
 

  tutorProfile:CreateUserDto[]=[];
  
  searchForm: FormGroup;
  profileData:any
  filteredTutors: any[] = [];


  @Output() getClickedTutor = new EventEmitter<CreateUserDto>();
  
  viewingMoreAbout:boolean=false;
  
  constructor(
    private authService:AuthService,
    private searchTutorService: TutorSearchService,
    private fb:FormBuilder
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
      
      const tutorsList=tutors.filter((tutor:any)=>tutor.role === 'tutor')
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
 
 viewingMore(tutorId:number,tutor:any){
  this.viewingMoreAbout=true;
  const tutorrToView=tutor
  this.getClickedTutor=tutorrToView
 console.log("Tutor to view", tutorId,tutor)
 }

 

 searchTutors(query: string): void {
  console.log('query', query);
  this.searchTutorService.searchTutors(query).subscribe({
    next: (tutors) => {
      this.filteredTutors = tutors;
      console.log('Filtered tutors:', this.filteredTutors);
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

getSingleUser(tutorId:number, tutor:any){}



}
