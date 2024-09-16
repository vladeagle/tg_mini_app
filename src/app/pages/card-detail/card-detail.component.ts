import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css',
  standalone: true,
  providers: [ImagesService],
  imports: [MatTabsModule]
})
export class CardDetailComponent implements OnInit, OnDestroy {
  imagesService = inject(ImagesService);

  imageById = toSignal(
    toObservable(this.imagesService.imageById)
  );

  randomImagesErr = toSignal(
    toObservable(this.imagesService.randomImagesErr)
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private telegram: TelegramService
  ) {
    const { id } = this.route.snapshot.params;
    this.imagesService.getImageById(id);
    this.goBack = this.goBack.bind(this);
  }

  ngOnInit(): void {
    this.telegram.backButton.show();
    this.telegram.backButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.telegram.backButton.offClick(this.goBack);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
