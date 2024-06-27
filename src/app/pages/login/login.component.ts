import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from './../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials: any = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}
  private loginService = inject(LoginService);
  private router = inject(Router);

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: response => {
        console.log('User logged in successfully', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: error => {
        console.error('Login error', error);

      }
    });

  }
}
