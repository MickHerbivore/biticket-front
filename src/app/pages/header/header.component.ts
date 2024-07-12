import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';

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
  showOptions = false;

  ngOnInit() {
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.checkRoute(event.url);
        }
      })
    );
  }
  setupAudioPlayer(): void {
    const audio = document.getElementById('myAudio') as HTMLAudioElement;
    let currentTrack = 0;

    audio.addEventListener('ended', () => {
      currentTrack++;
      if (currentTrack >= audio.children.length) {
        currentTrack = 0;
      }
      audio.src = (audio.children[currentTrack] as HTMLSourceElement).src;
      audio.play();
    });
  }
  checkRoute(url: string) {
    if (url.includes('login') || url.includes('registro')) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
