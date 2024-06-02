import { Component, inject, input } from '@angular/core';
import { Event } from '../../../interfaces/event';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { DatePipe } from '@angular/common';

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

  public event = input.required<Event>();

  onEvent() {
    this.eventService.currentEvent.set(this.event());
    this.router.navigate(['/buy/sector']);
  }

}
