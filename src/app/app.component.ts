import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelegramService } from './services/telegram.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>
      <a href="https://geomix.ru/">Go to Geomix main page</a>
      <a href="/">Home</a>
    </header>
    <router-outlet />
  `,
})
export class AppComponent {
  title = 'agnular_mini_app';
  telegram = inject(TelegramService);

  constructor() {
    this.telegram.ready();
  }
}
