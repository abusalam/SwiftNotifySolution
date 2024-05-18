import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AccessTokenResponse, AuthenticatedUserInfoResponse, InfoResponse } from './interfaces/auth.resp';
import { LoginRequest } from './interfaces/auth.req';
import { ConfigService } from './config.service';
import { BrowserStorageService } from './storage.service';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn:boolean =false;
  private accessToken:string = '';

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
    if(!this.isLoggedIn) {
      this.accessToken = this.browserStorage.getData('accessToken', true);
      if(this.accessToken) {
        this.isLoggedIn=true;
      }
    }
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

  getAuthenticatedUserInfo(accessToken: string) {
    console.log('getAuthenticatedUserInfo: ' + this.config.getBaseUrl());
    return this.http
      .get<AuthenticatedUserInfoResponse>(
          '/api/user',
          //Token is still not available to the interceptor  
          { headers : {"Authorization": `Bearer ${accessToken}`}}  
        )
      .pipe(
        tap((res:AuthenticatedUserInfoResponse)=>{
          if(res.id) {
            this.isLoggedIn=true;
            this.accessToken = accessToken;
            this.browserStorage.saveData('user', res.name);
            this.browserStorage.saveData('accessToken', accessToken, true);
            this.browserStorage.saveData('email', res.email);
            this.browserStorage.saveData('profile_photo_path', res.profile_photo_path);
          }
        }),
      );
  }

  getAccessToken():string {
    return this.accessToken;
  }

  checkAccessTokenValidity() {
    return this.http.get<AuthenticatedUserInfoResponse>('/api/user')
      .pipe(
        catchError(this.handleError)
      );
  }
  
  logoutUser(){
    this.browserStorage.clearData();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if(error.status === 401) {
      this.isLoggedIn=false;
      this.logoutUser();
      console.error(`Unauthorized: ${error.status}, body was: `, error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
