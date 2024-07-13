import { AsyncPipe, CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart/cart.service';
import { EventService } from '../../../services/event/event.service';
import { SectorPriceSelectorComponent } from './sector-price-selector/sector-price-selector.component';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterModule, NgFor, SectorPriceSelectorComponent, CurrencyPipe, AsyncPipe],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit, OnDestroy {

  private eventService = inject(EventService);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  private subs: Subscription[] = [];

  public event = this.eventService.currentEvent;
  public selectedTickets = this.cartService.selectedTickets;
  public loadingCart = this.cartService.loadingCart;

  public total = this.cartService.totalPrice;

  public ticketDetails = computed(() => {
    return this.event()?.ticketDetails.map((ticketEvent) => {
      const quantity = this.selectedTickets().filter((ticketCart) => ticketCart.sector._id === ticketEvent.sector._id).length || 0;

      return {
        ...ticketEvent,
        quantity
      };

    })
  });

  ngOnInit() {
    if (!this.event()) {
      this.router.navigate(['/home']);
      return;
    }

    this.getEvent();
  }

  getEvent() {
    this.subs.push(
      this.eventService.getCurrentEvent().subscribe()
    );
  }

  onSiguiente() {
    this.subs.push(
      this.orderService.createOrder().subscribe({
        next: () => this.router.navigate(['/buy/payment'])
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
