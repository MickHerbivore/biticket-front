import { TicketDetails } from './../../../interfaces/event';
import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  selectedTickets = signal<TicketDetails[]>([]);
  total = computed(() => this.selectedTickets().reduce((acc, ticket) => acc + ticket.price, 0));

  addTicket(ticket: TicketDetails) {
    this.selectedTickets.update((tickets) => {
      return [ ...tickets, ticket ];
    });
  }

  removeTicket(ticketRemove: TicketDetails) {
    this.selectedTickets.update((tickets) => {
      const ticketIndex = tickets.findIndex(ticket => ticket.sector.name === ticketRemove.sector.name);
      return tickets.filter((ticket, index) => index !== ticketIndex);
    });
  }

}
