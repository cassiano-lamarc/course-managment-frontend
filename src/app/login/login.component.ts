import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderServiceService } from '../services/loader-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm?: FormGroup;
  formEmptyMessage = 'Todos os campos devem ser preenchidos!';
  showLoader = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderServiceService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser())
      this.route.navigate(['/students']);
  }

  onSubmit(): void {
    this.loaderService?.start();

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(email, password, this.snackBar);
    } else this.loaderService.stop();
  }

  getEmailErrorMessage() {
    if (this.loginForm?.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm?.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
