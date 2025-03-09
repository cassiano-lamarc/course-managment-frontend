import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoaderServiceService } from './services/loader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'course-managment-frontend';
  userLoggedEmail = JSON.parse(localStorage?.getItem('UserData'))?.email;

  constructor(private authService: AuthService, private loader: LoaderServiceService, private route: Router) { }

  verifiyIsloggedin(): boolean {
    return !!localStorage.getItem('UserData');
  }

  logout() {
    this.loader.start();
    this.authService?.logout();
    this.route?.navigate(['/login']);
  }
}
