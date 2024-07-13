import { TicketDetails } from "./event";

export interface TicketRequest {
  userId: string;
  ticketId: string;
}

export interface Cart {
  _id: string;
  user: string;
  tickets: TicketDetails[];
  totalPrice: number;
}