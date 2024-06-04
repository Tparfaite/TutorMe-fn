import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';



interface Tutor {
  tutorId: number;
  imageUrl: string;
  tutorName: string;
  location: string;
  subject: string;
  description: string;
  availability: string;
 
}
@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css'],
})
export class TutorsComponent implements OnInit {
  
  

  tutors:Tutor[]=[
    {
      tutorId:1,
      imageUrl:'../../../../assets/movingImage2.jpg',
      tutorName:'mukamana Alphonsine',
      location:'musanze',
      subject:'chem',
      description:'kkkk',
      availability:'eat',
    
   },
   {
    tutorId:1,
    imageUrl:'../../../../assets/movingImage2.jpg',
    tutorName:'XXXXXX YYYYYY',
    location:'musanze',
    subject:'Biology',
    description:"kkkk Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    availability:'eat',
  
 },
 {
  tutorId:1,
  imageUrl:'../../../../assets/movingImage2.jpg',
  tutorName:'aaaaaaaaaaaaaaa aaaaaaa',
  location:'musanze',
  subject:'kinyanrwanda',
  description:'kkkk ppppppppppppppppp mmmmmmmmmmmmmm mmmmmmmmmmmmmm mmmmmmmmmmmmmm mmmmmmmmmmmmmm mmmmmmmmmm hhhhhhhh',
  availability:'eat',

},
{
  tutorId:1,
  imageUrl:'../../../../assets/WhatsApp Image 2024-06-01 at 19.10.59.jpeg',
  tutorName:'nnnnn mmmmm',
  location:'musanze',
  subject:'Literature',
  description:'kkkkmmmmmmmmmmmmmmm cnnnnnnnnnnn cnnnnnnnnnn cnnnnnnnnnnnnn cnnnnnnnnnnnnnn ncccccccccccccccc cnnnnnnnnnnnn nnnnnnnnnnnnn nnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnn yyyyyyyy',
  availability:'eat',

},
];


  @Output() getClickedTutor = new EventEmitter<Tutor>();
  
  viewingMoreAbout:boolean=false;
  
  constructor(){}
 ngOnInit(): void {
 
 }

 
 viewingMore(tutorId:number,tutor:any){
  this.viewingMoreAbout=true;
  const tutorrToView=tutor
  this.getClickedTutor=tutorrToView
 console.log("Tutor to view", tutorId,tutor)
 }




}
