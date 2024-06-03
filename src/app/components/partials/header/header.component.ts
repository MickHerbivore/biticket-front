import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private loginService = inject(LoginService);
  private router = inject(Router);

  isLoggedIn = this.loginService.isLoggedIn;
  username: string = 'Juanin Willyrex';
  showUsername: boolean = true;


  ngOnInit() {
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
      this.showUsername = true;
    }
  }
}
