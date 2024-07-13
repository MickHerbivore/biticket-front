export interface Event {
    _id: string;
    name: string;
    date: Date;
    location: string;
    imageUrl: string;
    ticketDetails: TicketDetails[];
}

export interface TicketDetails {
    _id: string;
    sector: Sector;
    price: number;
    quantity?: number;
}

export interface Sector {
    _id: string;
    name: string;
    color: string;
}

export interface SelectedTickets {
    ticketDetail: TicketDetails;
    quantity: number;
}
