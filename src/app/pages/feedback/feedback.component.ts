import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TelegramService } from '../../services/telegram.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule]
})
export class FeedbackComponent implements OnInit, OnDestroy {
  message = signal('');

  constructor(private telegram: TelegramService) {
    this.sendMessage = this.sendMessage.bind(this);
  }

  ngOnInit(): void {
    this.telegram.mainButton.setText('Send message');
    this.telegram.mainButton.show();
    this.telegram.mainButton.disable();
    this.telegram.mainButton.onClick(this.sendMessage);
  }

  ngOnDestroy(): void {
    this.telegram.mainButton.offClick(this.sendMessage);
  }

  sendMessage(): void {
    this.telegram.sendMessage({ message: this.message() })
  }

  handleInputChange(event): void {
    this.message.set(event.target.value);
    if (this.message().trim()) {
      this.telegram.mainButton.enable();
    } else {
      this.telegram.mainButton.disable();
    }
  }
}
