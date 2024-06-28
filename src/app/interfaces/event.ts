export interface Event {
    name: string;
    date: Date;
    location: string;
    image_url: string;
    ticketDetails: TicketDetails[];
}

export interface TicketDetails {
    sector: Sector;
    price: number;
}

export interface Sector {
    name: string;
    color: string;
}

export interface SelectedTickets {
    ticketDetail: TicketDetails;
    quantity: number;
}
