import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm?: FormGroup;
  formEmptyMessage = 'Todos os campos devem ser preenchidos!';
  showLoader = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.showLoader = true;

    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

      this.authService.login(username, password);
    }

    this.showLoader = false;
  }

  getUserNameErrorMessage() {
    if (this.loginForm?.get('username')?.hasError('required')) {
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
