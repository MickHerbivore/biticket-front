import { TicketDetails } from "./event";

export interface PaymentResponse {
  sessionId: string;
  paymentUrl: string;
}

export interface OrderResponse {
  _id: string;
  user: string;
  event: string;
  tickets: TicketDetails[];
  totalPrice: number;
  status: string;
}