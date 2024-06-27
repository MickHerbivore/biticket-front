import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterModule],
  templateUrl: './buy-tickets.component.html',
  styleUrl: './buy-tickets.component.css'
})
export class BuyTicketsComponent implements OnInit {

  private eventService = inject(EventService);
  private router = inject(Router);

  public event = this.eventService.currentEvent;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

}
