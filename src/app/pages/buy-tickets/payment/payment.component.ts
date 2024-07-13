import { CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentResponse } from '../../../interfaces/payment.interface';
import { CartService } from '../../../services/cart/cart.service';
import { EventService } from '../../../services/event/event.service';
import { OrderService } from '../../../services/order/order.service';

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
  private orderService = inject(OrderService);

  private subs: Subscription[] = [];

  public event = this.eventService.currentEvent;
  public ticketsBySector = this.cartService.ticketsBySector;
  public total = this.cartService.totalPrice;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

  onPagar() {
    this.subs.push(
      this.orderService.createPayment().subscribe({
        next: (value: PaymentResponse) => {
          window.location.href = value.paymentUrl;
        }
      })
    );
  }

}
