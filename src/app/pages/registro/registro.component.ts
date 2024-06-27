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
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) {}

  private router = inject(Router);

  onRegister() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.authService.register(this.user).subscribe({
      next: response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Registration error', error);
      }
    });
  }
}
