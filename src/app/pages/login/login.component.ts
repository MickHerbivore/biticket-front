import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);

  onLogin() {
    this.loginService.isLoggedIn.set(true);
    this.router.navigate(['/home']);
  }
}
