import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  showUsername: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User | null) => {
      console.log('Current User:', user);  // Debug log
      this.username = user ? user.first_name : null;
      this.showUsername = !!user;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  checkRoute(url: string) {
    if (url.includes('login') || url.includes('registro')) {
      this.showUsername = false;
    } else {
      this.showUsername = !!this.username;
    }
  }

  logout() {
    this.authService.logout(); // Asegúrate de que este método esté implementado en AuthService
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
