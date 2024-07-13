import { CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, CurrencyPipe, NgFor],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  private router = inject(Router);
  private eventService = inject(EventService);
  private cartService = inject(CartService);

  public event = this.eventService.currentEvent;
  public ticketsBySector = this.cartService.ticketsBySector;
  public total = this.cartService.totalPrice;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

  onPagar() {
    this.router.navigate(['/buy/tickets']);
  }

}
