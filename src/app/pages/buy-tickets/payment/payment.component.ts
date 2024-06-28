import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event/event.service';
import { CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { BuyService } from '../services/buy.service';

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
  private buyService = inject(BuyService);

  public event = this.eventService.currentEvent;
  public ticketsBySector = this.buyService.ticketsBySector;
  public total = this.buyService.totalPrice;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

  onPagar() {
    this.router.navigate(['/buy/tickets']);
  }

}
