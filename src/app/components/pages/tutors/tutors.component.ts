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
  
  viewingMoreAbout:boolean=false;
  
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



favoriteClicked(userId:number,tutorId:number){
  userId = this.authService.decodedUser().id;
 if(userId){
 this.authService.addTutorLike(userId,tutorId).subscribe({
  next:(result=>{
    console.log("result sub",result);
    this.getUpdatedTutors();
  }),
  error:(error=>{
    console.log("error for like",error.message)
  })
 })
 }else{
  this.toastr.error(Error.name)
  console.log("jjjjjjjjjjjj")
 }
 console.log("hello logged",userId)
}

getSingleUser(tutorId:number, tutor:any){}



}
