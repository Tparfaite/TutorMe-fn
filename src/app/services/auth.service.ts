import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMessageDto, CreateUserDto, UserLogin } from '../models/user.model';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,  private cookieService: CookieService) { }

  header = new HttpHeaders({
    "Content-Type": "application/json",
    
  })

  appUrl = 'http://localhost:3005/api'

  getToken(): string {
    return this.cookieService.get('accessToken');
  }

  createUser(user:CreateUserDto):Observable<any>{
    return this.http.post<CreateUserDto>(`${this.appUrl}/users/create`,user, {headers:this.header}).pipe(
      tap(result=>{
        console.log("created user is this",result)
      })
    )
  }

 

  login(user:UserLogin):Observable<any>{
    return this.http.post<UserLogin>(`${this.appUrl}/users/login`, user, {headers:this.header,withCredentials: true}).pipe(
      tap(loggedUser=>{
        console.log('the logged user is',loggedUser)
      })
    )
  }

  getUsers():Observable<any>{
    const token=this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.appUrl}/users/getAll`,{headers}).pipe(
      tap(allUsers=>{
        console.log('all users', allUsers)
      })
    )
  }

  
  sendMessage(message:CreateMessageDto):Observable<any>{
    return this.http.post<CreateMessageDto>(`${this.appUrl}/message/create`,message, {headers:this.header}).pipe(
      tap(result=>{
        console.log("posted message in db ",result)
      })
    )
  }


  getMessages():Observable<any>{
    return this.http.get(`${this.appUrl}/message/getAll`, {headers:this.header}).pipe(
      tap(allMessages=>{
        console.log("messages from db",allMessages)
      })
    )
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    
      this.http.get(`${this.appUrl}/users/logout`, { withCredentials: true }).subscribe({
        next: () => {
          this.cookieService.delete('accessToken');
         
        },
        error: (err) => {
          console.error('Logout failed', err);
        }
      });
    
   
  }


}
