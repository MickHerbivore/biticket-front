import { Component, input } from '@angular/core';
import { Event } from '../../../interfaces/event';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent {

  public event = input.required<Event>();

}
