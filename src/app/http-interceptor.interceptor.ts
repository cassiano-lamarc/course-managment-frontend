import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = JSON.parse(localStorage?.getItem('UserData'))

    if (user?.token) {
      request = request?.clone({
        setHeaders: { Authorization: `Bearer ${user?.token}` }
      })
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.router?.navigate(['/login']);
          }
        }
        return throwError(err);
      })
    );
  }
}
