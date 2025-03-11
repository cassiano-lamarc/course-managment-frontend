import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { LoaderService } from './shared/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'course-managment-frontend';
  userLoggedEmail = JSON.parse(localStorage?.getItem('UserData'))?.email;

  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private route: Router,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  verifiyIsloggedin(): boolean {
    return !!localStorage.getItem('UserData');
  }

  logout() {
    this.loader.start();
    this.authService?.logout();
    this.route?.navigate(['/login']);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.getChildRoute(this.activatedRoute);
        route.data.subscribe((data) => {
          if (data['title']) {
            this.titleService.setTitle(data['title']);
          }
        });
      });
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
