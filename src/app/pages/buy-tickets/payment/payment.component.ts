import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  private router = inject(Router);
  private eventService = inject(EventService);

  public event = this.eventService.currentEvent;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

  onPagar() {
    this.router.navigate(['/buy/tickets']);
  }

}
