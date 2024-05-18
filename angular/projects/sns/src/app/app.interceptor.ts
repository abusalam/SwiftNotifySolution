import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from "rxjs";
import { ConfigService } from './services/config.service';
import { BrowserStorageService } from './services/storage.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appConfig = inject(ConfigService);
  
  //Get the baseUrl from config
  const baseUrl = appConfig.getBaseUrl();

  let requestUrl = req.url;
  
  // Don't intercept request when loading config
  if(requestUrl!==appConfig.getConfigUrl()) {
    requestUrl = baseUrl + requestUrl;
    console.log("authInterceptor: " + requestUrl);
  }
  
  //Set common header for all intercepted requests
  let authHeaders: {[name: string]: string | string[];} | undefined = {
    Accept : "application/json",
  };
  
  //Set Authorization Bearer header only when token is available
  const accessToken = inject(AuthService).getAccessToken();//inject(BrowserStorageService).getData('accessToken');
  if(accessToken!=='') {
    authHeaders['Authorization'] = `Bearer ${accessToken}`;
  }

  //Prepare the request with baseUrl and required Headers
  return next(req.clone({ 
    url: `${baseUrl}${req.url}`,
    setHeaders: authHeaders
  }));
};

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('loggingInterceptor: ' + req.url);
  const authService = inject(AuthService);
  // const router = inject(Router);
  //return next(req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if([401, 403].includes(error.status)) {
        authService.logoutUser();
        // router.navigateByUrl('/');
      }
     console.log(`loggingInterceptor Error: ${error.status}`);
     return throwError(() => error);
    })
  )
};