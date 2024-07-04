import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] 
})
export class RegistroComponent implements OnDestroy {

  private authService = inject(AuthService);
  private router = inject(Router);
  private subs: Subscription[] = [];

  user: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };


  onRegister() {
    if (this.user.password !== this.user.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.subs.push(
      this.authService.register(this.user).subscribe({
        next: response => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Registration error', error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
