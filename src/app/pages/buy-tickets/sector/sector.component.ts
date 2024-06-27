import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [TitleCasePipe, DatePipe, RouterModule],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit {

  private eventService = inject(EventService);
  private router = inject(Router);

  public event = this.eventService.currentEvent;


  ngOnInit() {
    if (!this.event())
      this.router.navigate(['/home']);
  }

  onSiguiente() {
    this.router.navigate(['/buy/payment']);
  }

}
