import { Component, input } from '@angular/core';
import { IRandomImage } from '../../interfaces/natural-image.interface';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
  imports: [
    DatePipe,
    RouterModule
  ],
})
export class CardComponent {
  image = input.required<IRandomImage>();
}
