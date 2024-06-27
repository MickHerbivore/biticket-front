import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/User';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  username: string | null = null;
  showUsername: boolean = false;

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User | null) => {
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
}