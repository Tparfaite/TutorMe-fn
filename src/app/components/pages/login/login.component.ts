import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service'
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  getUserById(id: number): void {
    this.authService.getUserById(id).subscribe({
      next: (user) => {
        console.log('User data:', user);
        const userProfile = user.userProfile
        console.log("userProfile",userProfile)
        return user
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  onLogin() {
    this.submitted = true;
    this.isLoading = true;

    if (this.loginForm.valid) {
      
      this.spinner.show();

      const loggedUser = this.loginForm.value;

      this.authService.login(loggedUser).subscribe({
        next: (loggedUser) => {
          const tokenFromCookie=this.cookieService.get('accessToken');
          const decodedToken: any = jwtDecode(tokenFromCookie);

          
          setTimeout(() => {
           
            if (decodedToken.role === 'admin') {
              this.router.navigate(['/adminDashboard']);
            }else if(decodedToken.role === 'parent'){
              this.router.navigate(['/tutors'])
            }
             else {
              const loggedUserId=decodedToken.id;
             this.getUserById(loggedUserId);
              this.router.navigate(['/tutorDashboard']);
            }
            this.toastr.success('Logged in successfully');
            this.isLoading = false;
            this.spinner.hide();
            this.loginForm.reset();
            console.log("logged user role is",decodedToken.role)
          }, 800); 
        },
        error: (error) => {
          setTimeout(()=>{
            this.toastr.error(error);
            console.log('Login failed', error);
            this.isLoading = false;
            this.spinner.hide();
          },800)
          
        },
      });

      
    } else {
      return;
    }
  }



  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
