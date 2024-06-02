import { Injectable, signal } from '@angular/core';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public currentEvent = signal<Event | undefined>(undefined);
}
