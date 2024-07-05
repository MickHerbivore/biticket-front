import { Component, inject, input } from '@angular/core';
import { Event } from '../../../interfaces/event';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event/event.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent {

  private router = inject(Router);
  private eventService = inject(EventService);
  private authService = inject(AuthService);

  private isLoggedIn = this.authService.isLoggedIn;
  public event = input.required<Event>();

  onEvent() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.eventService.currentEvent.set(this.event());
    this.router.navigate(['/buy/sector']);
  }

}
