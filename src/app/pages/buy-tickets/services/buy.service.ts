import { Injectable, computed, signal } from '@angular/core';
import { SelectedTickets, TicketDetails } from './../../../interfaces/event';

@Injectable({
  providedIn: 'root'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
})
export class BuyService {

  selectedTickets = signal<TicketDetails[]>([]);
  totalPrice = computed(() => this.selectedTickets().reduce((acc, ticket) => acc + ticket.price, 0));
  ticketsBySector = computed<SelectedTickets[]>(() => {
    const ticketsBySector = this.selectedTickets().reduce((acc, ticket) => {
      const ticketIndex = acc.findIndex(ticketAcc => ticketAcc.ticketDetail.sector.name === ticket.sector.name);
      if (ticketIndex === -1) {
        acc.push({ ticketDetail: ticket, quantity: 1 });
      } else {
        acc[ticketIndex].quantity += 1;
      }
      return acc;
    }, [] as SelectedTickets[]);
    return ticketsBySector
  });

  resetSelectedTickets() {
    this.selectedTickets.set([]);
  }

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
