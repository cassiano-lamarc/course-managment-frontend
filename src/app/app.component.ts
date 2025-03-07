import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'course-managment-frontend';

  constructor(private authService: AuthService, private route: Router) { }

  verifiyIsloggedin(): boolean {
    return !!localStorage.getItem('UserData');
  }

  logout() {
    this.authService?.logout();
    this.route?.navigate(['/login']);
  }
}
