import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterModule],
  templateUrl: './buy-tickets.component.html',
  styleUrl: './buy-tickets.component.css'
})
export class BuyTicketsComponent {

  private eventService = inject(EventService);

  public event = this.eventService.currentEvent;

}
