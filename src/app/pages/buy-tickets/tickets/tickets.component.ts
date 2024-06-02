import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  private eventService = inject(EventService);
  private router = inject(Router);

  public event = this.eventService.currentEvent;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

}
