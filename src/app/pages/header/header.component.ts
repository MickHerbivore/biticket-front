import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private subs: Subscription[] = [];

  user = this.authService.currentUser;
  showMenu = false;


  ngOnInit() {
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.checkRoute(event.url);
        }
      })
    );
  }

  checkRoute(url: string) {
    if (url.includes('login') || url.includes('registro')) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
