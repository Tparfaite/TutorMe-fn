import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('paragraphAnimation', [
      transition('void => *', [ 
        style({ transform: 'translateY(-100%)' }), 
        animate('300ms ease-in-out', style({ transform: 'translateY(0)' })) 
      ]),
      transition('* => void', [
        style({ transform: 'translateY(0)' }),
        animate('200ms ease-in-out', style({ transform: 'translateY(-100%)' })) 
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  showParagraph = true;
  currentText = 'TutorMe: Smarter learning, Better results !';

  images: string[] = [
    '../../../../assets/movingImage1.jpg',
    '../../../../assets/movingImage2.jpg',
    '../../../../assets/movingImage3.jpg'
  ];

  currentImageIndex: number = 0;
  animationInterval: any;

  constructor(){}
  ngOnInit(): void {
    this.animateLoop()
    this.startImageAnimation()
  }
  animateLoop() {
    setTimeout(() => {
      this.showParagraph = false;
      this.currentText = this.currentText === 'TutorMe: Smarter learning, Better results !' ? 'TutorMe: Unlock your potential with expert Tutors' : 'TutorMe: Smarter learning, Better results !';
      setTimeout(() => {
        this.showParagraph = true;
        this.animateLoop();
      }, 200); 
    }, 3000);
  }

  startImageAnimation() {
    this.animationInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 4000);
  }

  
  
}
