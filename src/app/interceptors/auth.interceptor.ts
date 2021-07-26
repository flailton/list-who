import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request)
      .pipe(
        catchError((response) =>{
          if(response.status == 401){
            this.authService.clearToken();
            this.router.navigate(['login']);
          }
          return throwError({'errors': [response.error['errors'].join('<br/>')]});
        })
      );
  }

}