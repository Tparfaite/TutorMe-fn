import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ExamService } from 'src/app/services/exam.service';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Exam {
  id: number;
  domain: string;
  level: string;
  questions: Question[];
}

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {
  exam: Exam;
  userAnswers: string[] = [];
  correctAnswers: string[] = [];
  loggedUserEmail: string = '';
  examForm: FormGroup;
  examSubmitted:boolean=false;
  result:any;
  percentage:number

  constructor(
    private examService: ExamService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.generateExam();
  }

  getLoggedUserEmail() {
    const loggedUser = this.authService.decodedUser();
    this.loggedUserEmail = loggedUser.email;
    return loggedUser;
  }

  generateExam() {
    const subjectFormData = this.examService.getFormData();
    const { domain, level } = subjectFormData;
    console.log("domain and level selected", domain);
    this.examService.generateExam(domain, level).subscribe((data) => {
      console.log("data question", data);
      this.correctAnswers=data.correctAnswers
      console.log("correct answer",this.correctAnswers)
      this.exam = {
        id: data.exam.id,
        domain: data.exam.domain,
        level: data.exam.level,
        questions: data.selectedQuestions,
      };
      
      this.userAnswers = new Array(this.exam.questions.length).fill('');

      
      this.examForm = this.fb.group({
        questions: this.fb.array(
          this.exam.questions.map(() => 
            this.fb.group({
              selectedAnswer: ['', Validators.required]
            })
          )
        )
      });
    });
  }



  onSubmitExam() {

    if(this.examForm.valid){
      this.spinner.show()
      const questionsArray = this.examForm.get('questions') as FormArray;
      this.userAnswers = questionsArray.controls.map((control, index) => {
        const answer = control.get('selectedAnswer')?.value;
        return answer;
      });


      const userId = this.getLoggedUserEmail().id;
      this.examService.submitExam(userId, this.exam.id, this.userAnswers,this.correctAnswers).subscribe({
        next:(result) => {
          this.result=result;
          const questionArrayLength= this.exam.questions.length;
          const marks = this.result.marks;
          this.percentage = parseFloat(((marks * 100)/questionArrayLength).toFixed(2))
        
          

          if(this.result.passed===true){
            console.log("yhis.result.passed",this.result.passed)
            setTimeout(()=>{
              this.examSubmitted=true 
              this.examForm.reset()
              this.spinner.hide()
              setTimeout(()=>{
                this.router.navigate(['/tutor/updateProfile'])
              },4000)
              

            },800)
          }else{
            setTimeout(()=>{
              this.examSubmitted=true
              this.examForm.reset();
              this.spinner.hide();

            },800)
          }

        }, error: (error)=>{
          console.log("Submission failed",error)
        }
      });
    }
    
  }
}
