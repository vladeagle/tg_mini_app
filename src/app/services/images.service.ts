import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { IAPOD } from '../interfaces/apod.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IRandomImage } from '../interfaces/natural-image.interface';
import { catchError, Observable, take, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  apod = signal<IAPOD>(null);
  apodIsLoading = signal(false);
  randomImages = signal<IRandomImage[]>([]);
  imageById = signal<IRandomImage>(null);
  randomImagesErr = signal('');

  constructor(
    private http: HttpClient,
    private dr: DestroyRef,
  ) { }

  getAPOD(): void {
    this.apodIsLoading.set(true);
    this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${environment.nasaApiKey}`)
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe((res: IAPOD) => {
        this.apod.set(res);
        this.apodIsLoading.set(false);
      });
  }

  getRandom(): void {
    this.http.get(`https://api.unsplash.com/photos/random?count=3&client_id=${environment.apiKey}`)
      .pipe(
        take(1),
        catchError(err => this.handleError(err)),
        takeUntilDestroyed(this.dr)
      )
      .subscribe(
        (res: IRandomImage[]) => this.randomImages.set(res),
        (err) => this.handleError(err)
      )
  }

  getImageById(id: string): void {
    this.randomImages.set([]);
    this.http.get<IRandomImage>(`https://api.unsplash.com/photos/${id}?client_id=${environment.apiKey}`).pipe(takeUntilDestroyed(this.dr))
      .subscribe(
        (res: IRandomImage) => this.imageById.set(res),
        (err) => this.handleError(err)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    this.randomImages.set([]);
    this.randomImagesErr.set(error.error?.errors[0]);
    return throwError(() => error);
  }
}
