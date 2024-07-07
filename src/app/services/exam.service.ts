import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient,  private cookieService: CookieService) { }

  header = new HttpHeaders({
    "Content-Type": "application/json",
    
  })

  appUrl = 'http://localhost:3005/api'

  private formData: any;

  setFormData(data: any) {
    this.formData = data;
  }

  getFormData() {
    return this.formData;
  }

  generateExam(domain: string, level: string): Observable<any> {
    return this.http.get(`${this.appUrl}/exams/${domain}/${level}`);
  }

  submitExam(userId: number, examId: number, userAnswers: string[]): Observable<any> {
    return this.http.post(`${this.appUrl}/exams/${userId}/${examId}`, { userAnswers });
  }

}
