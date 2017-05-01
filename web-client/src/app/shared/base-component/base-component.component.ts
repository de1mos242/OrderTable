import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class BaseComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  subscribed(sub: Subscription) {
    this.subscriptions.push(sub);
  }
}
