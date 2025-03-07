import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCredencials } from '../models/auth/user-credencials.model';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  private localStorageAuthUserData = 'UserData';

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem(this.localStorageAuthUserData);
  }

  login(username: string, password: string) {
    this.http.post<UserCredencials>(`${environment.baseUrl}auth`, { username, password })
      .subscribe({
        next: (res) => {
          this.isAuthenticated = res?.token ? true : false;
          localStorage.setItem(this.localStorageAuthUserData, JSON.stringify(res));

          this.router.navigate(['/students']);
        },
        error: (err) => {
          if (err.status == 400)
            alert('O nome de usuário ou senha estão incorretos. Tente novamente.');

          console.log(err);
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
