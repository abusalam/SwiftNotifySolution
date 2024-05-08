import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from "rxjs";
import { ConfigService } from './services/config.service';
import { BrowserStorageService } from './services/storage.service';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const appConfig = inject(ConfigService);

  if(req.url===appConfig.getConfigUrl()) {
    return next(req);
  }

  const accessToken = inject(BrowserStorageService).getData('accessToken');
  console.log("Intercepting: " + req.url);
  const baseUrl = appConfig.getBaseUrl();
  const cloneRequest =  req.clone({ 
    url: `${baseUrl}${req.url}`,
    setHeaders:{
      Authorization: `Bearer ${accessToken}`
    }
  });
  return next(cloneRequest);
};

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  //return next(req);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
     let errorMsg = error.error;  
     console.log(`loggingInterceptor: ${errorMsg}`);
     return throwError(() => errorMsg);
    })
  )
};