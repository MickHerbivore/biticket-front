import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cart, TicketRequest } from '../../interfaces/cart.interface';
import { SelectedTickets, TicketDetails } from '../../interfaces/event';
import { AuthService } from '../auth/auth.service';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private eventService = inject(EventService);

  public currentCart = toSignal(this.getCart());
  public loadingCart = signal<boolean>(false);

  public selectedTickets = signal<TicketDetails[]>([]);
  
  public totalPrice = computed(() => this.selectedTickets().reduce((acc, ticket) => acc + ticket.price, 0));
  
  public ticketsBySector = computed<SelectedTickets[]>(() => {
    const ticketsBySector = this.selectedTickets().reduce((acc, ticket) => {
      const ticketIndex = acc.findIndex(ticketAcc => ticketAcc.ticketDetail.sector._id === ticket.sector._id);
      if (ticketIndex === -1) {
        acc.push({ ticketDetail: ticket, quantity: 1 });
      } else {
        acc[ticketIndex].quantity += 1;
      }
      return acc;
    }, [] as SelectedTickets[]);
    return ticketsBySector
  });

  public resetSelectedTickets() {
    this.selectedTickets.set([]);
  }

  public addTicket( ticket: TicketDetails ) {
    const request: TicketRequest = {
      userId: this.authService.currentUser()?.id!,
      ticketId: ticket._id,
      eventId: this.eventService.currentEvent()?._id!
    };
    return this.http.post(`${environment.apiUrl}${environment.cartAddPath}`, request)
    .pipe(
      tap(() => this.pushTicket(ticket))
    );
  }

  public removeTicket( ticketRemove: TicketDetails ) {
    const request: TicketRequest = {
      userId: this.authService.currentUser()?.id!,
      ticketId: ticketRemove._id
    };
    return this.http.post(`${environment.apiUrl}${environment.cartRemovePath}`, request)
    .pipe(
      tap(() => this.popTicket(ticketRemove))
    );
  }

  private getCart() {
    return this.http.get<Cart>(`${environment.apiUrl}${environment.cartPath}${this.authService.currentUser()?.id}`)
    .pipe(
      tap((cart) => {
        this.selectedTickets.set(cart?.tickets ?? []);
      })
    );
  }
  
  private pushTicket(ticket: TicketDetails) {
    this.selectedTickets.update((tickets) => {
      return [ ...tickets, ticket ];
    });
  }

  private popTicket(ticketRemove: TicketDetails) {
    this.selectedTickets.update((tickets) => {
      const ticketIndex = tickets.findIndex(ticket => ticket.sector._id === ticketRemove.sector._id);
      return tickets.filter((ticket, index) => index !== ticketIndex);
    });
  }
}
