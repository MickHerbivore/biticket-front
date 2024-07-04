import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { EventService } from '../../services/event/event.service';
import { BuyService } from '../buy-tickets/services/buy.service';
import { EventItemComponent } from './event-item/event-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventItemComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  private authService = inject(AuthService);
  private eventService = inject(EventService);
  private buyService = inject(BuyService);

  isLoggedIn = this.authService.isLoggedIn;
  events = this.eventService.events;
  
  ngOnInit(): void {
    this.buyService.resetSelectedTickets();
  }

}
