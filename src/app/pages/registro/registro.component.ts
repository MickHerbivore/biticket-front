import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  user: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.register({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      password: this.user.password
    }).subscribe({
      next: () => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error', error);
      }
    });
  }
}
