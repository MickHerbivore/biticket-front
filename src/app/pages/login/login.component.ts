import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';
import { AuthRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  private subs: Subscription[] = [];
  
  credentials: AuthRequest = {
    email: '',
    password: ''
  };


  onLogin() {
    this.subs.push(
      this.authService.login(this.credentials).subscribe({
        next: response => {
          console.log('User logged in successfully', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        error: error => {
          console.error('Login error', error);

        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
