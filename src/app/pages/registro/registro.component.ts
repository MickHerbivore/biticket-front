import { LoginService } from './../../services/login.service';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);

  onRegister() {
    this.loginService.isLoggedIn.set(true);
    this.router.navigate(['/home']);
  }
}