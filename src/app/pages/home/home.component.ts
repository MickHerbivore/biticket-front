import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventItemComponent } from './event-item/event-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventItemComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public events: Event[] = [
    {
      name: 'Iron Maiden',
      date: '25/06/2024',
      location: 'Movistar Arena',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'Metallica',
      date: '10/07/2024',
      location: 'Estadio Nacional',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'Coldplay',
      date: '15/08/2024',
      location: 'Parque Bicentenario',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'Arctic Monkeys',
      date: '05/09/2024',
      location: 'Movistar Arena',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'The Weeknd',
      date: '20/10/2024',
      location: 'Movistar Arena',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'Beyoncé',
      date: '30/11/2024',
      location: 'Estadio Monumental',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
  ];
}
