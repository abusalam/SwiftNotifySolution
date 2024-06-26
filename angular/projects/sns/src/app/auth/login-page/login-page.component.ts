import { Component, OnInit, afterNextRender } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../services/interfaces/auth.req';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  user: LoginRequest = {
    "email": "",
    "password": "",
    "twoFactorCode": "",
    "twoFactorRecoveryCode": ""
  };

  constructor(private router: Router, private authService: AuthService){
    afterNextRender (() => {

    });
  }

  ngOnInit() {
    let accessToken = this.router.routerState.snapshot.root.firstChild?.queryParams['token'];
    
    if(accessToken) {
      console.log('Trying with: ' + accessToken);
      this.authService.getAuthenticatedUserInfo(accessToken).subscribe(()=>{
        if(this.authService.isAuthenticated()) {
          this.router.navigateByUrl('/dashboard');
        }
      });
    }
  }

  onLogin() {
    this.authService.loginRequest(this.user).subscribe(()=>{
      console.log('Logged In');
      if(this.authService.isAuthenticated()) {
        this.router.navigateByUrl('/dashboard');
      }
    });

    // .subscribe((res:InfoResponse)=>{
    //   console.log(`authGuard(): ${res.email}`);
    //   return true;
    // }),
    // (error: HttpErrorResponse) => {
    //   if (error.status === 401) {
    //     return false;
    //   }
    //   return false;
    // }
    // return false;
  }
}
