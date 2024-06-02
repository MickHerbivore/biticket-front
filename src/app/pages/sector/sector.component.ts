import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [TitleCasePipe, DatePipe],
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
    this.router.navigate(['/payment']);
  }

}
