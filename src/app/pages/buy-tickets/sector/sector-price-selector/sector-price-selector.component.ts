import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { BuyService } from '../../services/buy.service';
import { TicketDetails } from './../../../../interfaces/event';

@Component({
  selector: 'app-sector-price-selector',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './sector-price-selector.component.html',
  styleUrl: './sector-price-selector.component.css'
})
export class SectorPriceSelectorComponent {

  private buyService = inject(BuyService);

  public ticketDetail = input.required<TicketDetails>();
  public quantity = signal(0);

  public addOne() {
    this.quantity.update(() => this.quantity() + 1);
    this.buyService.addTicket(this.ticketDetail());
  }

  public substractOne() {
    this.quantity.update(() =>{
      if (this.quantity() === 0) return 0;
      return this.quantity() - 1
    });

    this.buyService.removeTicket(this.ticketDetail());
  }
}
