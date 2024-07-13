import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { EventService } from '../../services/event/event.service';
import { EventItemComponent } from './event-item/event-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventItemComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  private authService = inject(AuthService);
  private eventService = inject(EventService);

  isLoggedIn = this.authService.isLoggedIn;
  events = this.eventService.events;
}
