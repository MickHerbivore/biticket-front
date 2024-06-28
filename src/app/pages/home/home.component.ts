import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Event } from '../../interfaces/event';
import { AuthService } from '../../services/auth/auth.service';
import { EventItemComponent } from './event-item/event-item.component';
import { EventService } from '../../services/event/event.service';
import { Subscription } from 'rxjs';
import { BuyService } from '../buy-tickets/services/buy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventItemComponent, NgFor, NgIf, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {

  private authService = inject(AuthService);
  private eventService = inject(EventService);
  private buyService = inject(BuyService);
  private subs: Subscription[] = [];

  isLoggedIn = this.authService.isLoggedIn;
  events: Event[] = [];
  
  ngOnInit(): void {
    this.buyService.resetSelectedTickets();
    this.subs.push(
      this.eventService.getEvents().subscribe({
        next: (events) => {
          this.events = events;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
