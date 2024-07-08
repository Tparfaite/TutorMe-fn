import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMessageDto, CreateUserDto, UpdateProfileDto, UserLogin } from '../models/user.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,  private cookieService: CookieService) { }

  private getHeaders(){
    const token = this.cookieService.get('accessToken');
   
    return new HttpHeaders().set('Authorization',`Bearer ${token}`)
  }

  header = new HttpHeaders({
    "Content-Type": "application/json",
    
  })

  appUrl = 'http://localhost:3005/api'

  getToken(): string {
    return this.cookieService.get('accessToken');
  }
  
  decodedUser(){
    const payloadDecoded:{email:string,id:number, role:string}= jwtDecode(this.getToken());
    console.log('decoded in authservice',payloadDecoded)
    return payloadDecoded
    
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
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
      if (error.status === 404) {
        errorMessage = 'User with this email not found';
      } else if (error.status === 400) {
        errorMessage = 'Invalid credentials';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
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

  getUserById(id:number):Observable<any>{
    const token=this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.appUrl}/users/${id}`,{headers}).pipe(
      tap(user=>{
        console.log('all users', user)
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

  createUserProfile(id:number,userProfile:UpdateProfileDto ):Observable<any>{
   return this.http.post<UpdateProfileDto>(`${this.appUrl}/users/profile/${id}`,userProfile, {headers:this.header}).pipe(
    tap(result=>{
      console.log("userProfile",result)
    })
   )
  }

  updateUser(id:number,updateUser:CreateUserDto):Observable<any>{
    return this.http.patch(`${this.appUrl}/users/update/${id}`, updateUser, {headers:this.header}).pipe(
      tap(result=>{
        console.log("updated user",result)
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

  deleteMessage(id:number):Observable<any>{
    return this.http.delete(`${this.appUrl}/message/delete/${id}`, {headers:this.header}).pipe(
      tap(result=>{

      })
    )
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.appUrl}/users/delete/${id}`, {headers:this.header}).pipe(
      tap(result=>{

      })
    )
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
 logout(): Observable<void> {
  return this.http.get<void>(`${this.appUrl}/users/logout`, { withCredentials: true }).pipe(
    tap(() => {
      this.cookieService.delete('accessToken');
    })
  );
 }

 addTutorLike(userId:number,tutorId:number):Observable<any>{
  console.log("sent headers",this.getHeaders())
  return this.http.post(`${this.appUrl}/likes/${userId}/${tutorId}`,{},{headers:this.getHeaders()}).pipe(
    tap(result=>{
      console.log("like added",result)
    })
  )
 }

 getReceivedLikes(tutorId:number):Observable<any>{
  return this.http.post(`${this.appUrl}/${tutorId}`,{ headers:this.header}).pipe(
    tap(result=>{
      console.log("received likes",result)
    })
  )
 }


  

}
