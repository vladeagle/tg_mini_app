import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/marketplace/main-page.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'card-detail/:id',
    component: CardDetailComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  }
];
