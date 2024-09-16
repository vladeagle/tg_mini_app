import { Component, inject, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { APODInitialValue } from '../../consts/apod-init.const';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone: true,

  providers: [ImagesService],
  imports: [
    CardComponent,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class MainPageComponent implements OnInit {
  imagesService = inject(ImagesService);

  apod = toSignal(
    toObservable(this.imagesService.apod), { initialValue: APODInitialValue }
  );
  apodIsLoading = toSignal(
    toObservable(this.imagesService.apodIsLoading), { initialValue: false }
  );
  randomImages = toSignal(
    toObservable(this.imagesService.randomImages), { initialValue: [] }
  );
  randomImagesErr = toSignal(
    toObservable(this.imagesService.randomImagesErr), { initialValue: '' }
  );

  ngOnInit(): void {
    this.getRandom();
  }

  getAPOD(): void {
    this.imagesService.getAPOD();
  }

  getRandom(): void {
    this.imagesService.getRandom();
  }
}
