import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Event } from '../../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private http = inject(HttpClient);

  public currentEvent = signal<Event | undefined>(undefined);

  public events = toSignal(this.getEvents());
  
  private getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiUrl}${environment.eventPath}`);
  }

}
