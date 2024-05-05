import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../services/interfaces/auth.req';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccessTokenResponse } from '../../services/interfaces/auth.resp';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginRequest: LoginRequest = {
    "email": "",
    "password": "",
    "twoFactorCode": "",
    "twoFactorRecoveryCode": ""
  };

  constructor(private http: HttpClient, private router: Router){
    this.loginRequest=this.loginRequest;
  }

  onLogin() {
    console.log(this.loginRequest);
    //debugger;
    this.http.post<AccessTokenResponse>(
      'http://dotnet.sns.test/auth/login',
       this.loginRequest
      )
    .subscribe((res:AccessTokenResponse)=>{
      if(res.tokenType==='Bearer') {
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('expiresIn', res.expiresIn.toString())
        localStorage.setItem('refreshToken', res.refreshToken)
        localStorage.setItem('tokenType', res.tokenType)
        this.router.navigateByUrl('/dashboard')
      } else {
        alert('Not found')
      }
    })
  }
}
