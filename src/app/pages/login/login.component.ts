import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

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
    private route: Router,
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser())
      this.route.navigate(['/students']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(email, password);
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm?.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.loginForm?.get('email')?.hasError('email'))
      return 'Email is not valid';

    return '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm?.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
