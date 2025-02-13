import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";


@Injectable({
    providedIn: 'root'
})

export class AuthGuard{
    constructor(private router: Router, private cookieService: CookieService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.cookieService.get('accessToken');
        if (token) {
            const decodedToken:{role:string} = jwtDecode(token);
            const userRole = decodedToken.role;
            const requiredRole = route.data['role'];
            if(userRole===requiredRole){
             return true
            }else{
                this.router.navigate(['/forbidden'])
                return false
            }
        }else{
            this.router.navigate(['/login']);
            return false
        }
    }
}