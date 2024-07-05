import { AsyncPipe, CurrencyPipe, DatePipe, NgFor, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../../services/event/event.service';
import { BuyService } from '../services/buy.service';
import { SectorPriceSelectorComponent } from './sector-price-selector/sector-price-selector.component';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterModule, NgFor, SectorPriceSelectorComponent, CurrencyPipe, AsyncPipe],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit {

  private eventService = inject(EventService);
  private buyService = inject(BuyService);
  private router = inject(Router);

  public event = this.eventService.currentEvent;

  public total = this.buyService.totalPrice;


  ngOnInit() {
    if (!this.event()) {
      this.router.navigate(['/home']);
      return;
    }

    this.getEvent();
  }

  getEvent() {
    this.eventService.getCurrentEvent().subscribe();
  }

  onSiguiente() {
    this.router.navigate(['/buy/payment']);
  }

}
