import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredencials } from '../models/auth/user-credencials.model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { LoaderServiceService } from './loader-service.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private localStorageAuthUserData = 'UserData';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loader: LoaderServiceService
  ) {
    this.isAuthenticated = !!localStorage.getItem(
      this.localStorageAuthUserData
    );
  }

  login(email: string, password: string) {
    this.http
      .post<UserCredencials>(`${environment.baseUrl}auth`, { email, password })
      .pipe(finalize(() => this.loader?.stop()))
      .subscribe({
        next: (res) => {
          this.isAuthenticated = res?.token ? true : false;
          localStorage.setItem(
            this.localStorageAuthUserData,
            JSON.stringify(res)
          );

          this.router.navigate(['/students']);
        }
      });
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    localStorage.removeItem(this.localStorageAuthUserData);
    this.isAuthenticated = false;
    this.loader.stop();
  }
}
