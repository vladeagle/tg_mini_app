import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ITgButton } from '../interfaces/tg-button.interface';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  public telegram;
  private window;

  constructor(@Inject(DOCUMENT) private _document) {
    this.window = this._document.defaultView;
    this.telegram = this.window.Telegram.WebApp;
  }

  get mainButton(): ITgButton {
    return this.telegram.MainButton;
  }

  get backButton(): ITgButton {
    return this.telegram.BackButton;
  }

  ready(): void {
    this.telegram.ready();
  }

  sendMessage(data: object): void {
    this.telegram.sendData(JSON.stringify(data));
  }
}
