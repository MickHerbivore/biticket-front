import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, model, OnDestroy } from '@angular/core';
import { concatMap, Subject, Subscription, tap } from 'rxjs';
import { CartService } from '../../../../services/cart/cart.service';
import { TicketDetails } from './../../../../interfaces/event';

@Component({
  selector: 'app-sector-price-selector',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './sector-price-selector.component.html',
  styleUrl: './sector-price-selector.component.css'
})
export class SectorPriceSelectorComponent implements OnDestroy {

  private cartService = inject(CartService);
  private subs: Subscription[] = [];

  public ticketDetail = input.required<TicketDetails>();
  public quantity = model(0);

  private addRemoveSubject = new Subject<boolean>();

  constructor() {
    this.subs.push(
      this.addRemoveSubject.pipe(
        tap(() => this.cartService.loadingCart.set(true)),
        concatMap((add) => {
          if (add) {
            this.quantity.update(() => this.quantity() + 1);
            return this.cartService.addTicket(this.ticketDetail());
          } else {
            return this.cartService.removeTicket(this.ticketDetail());
          }
        })
      ).subscribe({
        next: () => this.cartService.loadingCart.set(false),
        error: (error) => {
          this.cartService.loadingCart.set(false);
          console.error('error adding ticket', error);
        }
      })
    );
  }

  public addOne() {
    this.addRemoveSubject.next(true);
  }

  public substractOne() {
    if (this.quantity() === 0) return;

    this.quantity.update(() =>{
      return this.quantity() - 1
    });

    this.addRemoveSubject.next(false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
