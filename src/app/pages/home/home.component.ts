import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { EventItemComponent } from './event-item/event-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventItemComponent, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public events: Event[] = [
    {
      name: 'Iron Maiden',
      date: new Date('06/25/2024'),
      location: 'Movistar Arena',
      image_url: 'https://64.media.tumblr.com/ba118e44ffbe567c270ce8411a9283a3/a96d5907eaa015bb-7b/s1280x1920/0ac5c7fcadf4d025d574baf3fc27cde17007d966.jpg',
    },
    {
      name: 'Metallica',
      date: new Date('07/10/2024'),
      location: 'Estadio Nacional',
      image_url: 'https://www.nme.com/wp-content/uploads/2020/04/Metallica.jpg',
    },
    {
      name: 'Coldplay',
      date: new Date('08/15/2024'),
      location: 'Parque Bicentenario',
      image_url: 'https://images.gmanews.tv/webpics/2024/01/Coldplay_2024_01_18_19_57_08.jpg',
    },
    {
      name: 'Arctic Monkeys',
      date: new Date('09/05/2024'),
      location: 'Movistar Arena',
      image_url: 'https://www.rollingstone.com/wp-content/uploads/2020/12/ArcticMonkeysRAHedits_highres_pcAaronParsons_7.jpg',
    },
    {
      name: 'The Weeknd',
      date: new Date('10/20/2024'),
      location: 'Movistar Arena',
      image_url: 'https://ca-times.brightspotcdn.com/dims4/default/c349e07/2147483647/strip/false/crop/6720x3780+0+700/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F20%2F08%2F9d3609f448de92ed7dc28a39da26%2Fphoto-2022-08-07-3-30-56-am.jpg',
    },
    {
      name: 'Beyoncé',
      date: new Date('11/30/2024'),
      location: 'Estadio Monumental',
      image_url: 'https://phantom-telva.unidadeditorial.es/d7aaebf52175bff307484206f6275756/crop/268x59/1759x897/resize/1200/f/webp/assets/multimedia/imagenes/2023/06/09/16863054079444.jpg',
    },
  ];
}
