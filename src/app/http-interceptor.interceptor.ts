import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private route: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage?.getItem('UserData'));

    if (user?.token) {
      request = request?.clone({
        setHeaders: { Authorization: `Bearer ${user?.token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err?.status == HttpStatusCode.BadRequest && err?.error?.Message) {
            Swal.fire('Warning', err?.error?.Message, 'warning');
            return throwError(err);
          }

          if (err.status == 401) {
            this.authService?.logout();
            this.route?.navigate(['/login']);

            return throwError(err);
          }

          Swal.fire('Error', 'Ocourred an internal server error', 'error');
        }
        return throwError(err);
      })
    );
  }
}
