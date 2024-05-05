import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AccessTokenResponse, InfoResponse } from './interfaces/auth.resp';
import { LoginRequest } from './interfaces/auth.req';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { BrowserStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private browserStorage: BrowserStorageService = inject(BrowserStorageService);
  constructor(private http: HttpClient, private config: ConfigService) { }

  sendLoginRequest(loginRequest:LoginRequest)
  {
    console.log(loginRequest);
    //debugger;
    this.http.post<AccessTokenResponse>(
      '/auth/login',
       loginRequest
      )
    .subscribe((res:AccessTokenResponse)=>{
      if(res.expiresIn) {
        this.browserStorage.saveData('accessToken', res.accessToken)
        this.browserStorage.saveData('expiresIn', res.expiresIn.toString())
        this.browserStorage.saveData('refreshToken', res.refreshToken)
        this.browserStorage.saveData('tokenType', res.tokenType)
      } else {
        alert('Not found')
      }
      return res;
    })
  }

  isLoggedIn() {
    return this.http.get<InfoResponse>('/auth/manage/info');
  }
}
