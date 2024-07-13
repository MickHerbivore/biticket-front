import { DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from '../../../services/event/event.service';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, NgFor],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnDestroy {

  private eventService = inject(EventService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private subs: Subscription[] = [];

  public event = this.eventService.currentEvent;
  public order = this.orderService.order;


  ngOnInit() {
    this.subs.push(
      this.activatedRoute.params.subscribe(params => {
        if (!params['orderId'] || !params['eventId']) {
          this.router.navigate(['/home']);
          return;
        }

        this.getOrder( params['orderId'] );
        this.getEvent( params['eventId'] );
      })
    );
  }

  getOrder(orderId: string) {
    this.subs.push(
      this.orderService.getOrder(orderId).subscribe()
    );
  }

  getEvent(eventId: string) {
    this.subs.push(
      this.eventService.getEvent(eventId).subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
