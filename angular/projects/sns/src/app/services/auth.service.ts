import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AccessTokenResponse, InfoResponse } from './interfaces/auth.resp';
import { LoginRequest } from './interfaces/auth.req';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { BrowserStorageService } from './storage.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn:boolean =false;

  private browserStorage: BrowserStorageService = inject(BrowserStorageService);
  constructor(private http: HttpClient, private config: ConfigService) { }

  loginRequest(loginRequestCred:LoginRequest)
  {
    console.log(loginRequestCred);
    //debugger;
    return this.http.post<AccessTokenResponse>('/auth/login', loginRequestCred)
      .pipe(
        tap((res:AccessTokenResponse)=>{
          if(res.tokenType==='Bearer') {
            this.browserStorage.saveData('accessToken', res.accessToken)
            this.browserStorage.saveData('expiresIn', res.expiresIn.toString())
            this.browserStorage.saveData('refreshToken', res.refreshToken)
            this.browserStorage.saveData('tokenType', res.tokenType)
            this.isLoggedIn=true;
          }
        }),
      );
  }

  isAuthenticated()
  {
    return this.isLoggedIn;
  }

  getUserInfo() {
    return this.http.get<InfoResponse>('/auth/manage/info')
      .pipe(
        tap((res:InfoResponse)=>{
          if(res.email) {
            this.browserStorage.saveData('email', res.email, true)
            this.browserStorage.saveData('isEmailConfirmed', res.isEmailConfirmed.toString(), true)
            this.isLoggedIn=true;
          }
        }),
      );
  }

  logoutUser(){
    this.browserStorage.clearData();
  }
}
