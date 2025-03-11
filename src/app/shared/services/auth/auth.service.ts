import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { UserCredencials } from 'src/app/models/auth/user-credencials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private localStorageAuthUserData = 'UserData';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.isAuthenticated = !!localStorage.getItem(
      this.localStorageAuthUserData
    );
  }

  login(email: string, password: string) {
    this.http
      .post<UserCredencials>(`${environment.baseUrl}auth`, { email, password })
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
  }
}
