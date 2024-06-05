import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
  submitted:boolean=false
  messageForm:FormGroup
  showParagraph = true;
  isLoading:boolean=true
  currentText = 'TutorMe: Smarter learning, Better results !';


  currentImageIndex: number = 0;
  animationInterval: any;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ){
    this.messageForm = this.formBuilder.group({
      names:['',Validators.required],
      email:['', [Validators.required, Validators.email]],
      message:['',Validators.required]
    })
  }
  ngOnInit(): void {

  }
  onMessageSubmit(){
    this.submitted=true
    this.isLoading = true;
    if(this.messageForm.valid){
      this.spinner.show()
      const message= this.messageForm.value;
      this.authService.sendMessage(message).subscribe({
        next:(response=>{
          setTimeout(() => {
            this.toastr.success('Message sent');
            this.isLoading=false;
            this.spinner.hide();
            this.messageForm.reset();
            this.submitted=false
          },2000)
          console.log("this is response meaasge from client",response)
        }), error:(error=>{
          setTimeout(()=>{
            this.isLoading=false;
            this.toastr.error('Message not sent, An error occured!');
            this.submitted=false
            this.spinner.hide()
            throw error.message
          },2000)
           
        })
      })
      
      
    }else{
      return
    }
  }
 

  
  
}
