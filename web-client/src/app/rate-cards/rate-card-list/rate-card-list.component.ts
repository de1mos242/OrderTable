import { Component, OnInit } from '@angular/core';
import { RateCardService } from '../../backend/rate-card.service';
import { Observable } from 'rxjs/Observable';
import { RateCard } from '../../models/rate-card.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { BaseComponent } from '../../shared/base-component/base-component.component';

@Component({
  selector: 'ot-rate-card-list',
  templateUrl: './rate-card-list.component.html',
  styleUrls: [ './rate-card-list.component.css' ]
})
export class RateCardListComponent extends BaseComponent implements OnInit {
  private rateCards: Observable<RateCard[]>;
  private rateCardName: string;
  isLoggedIn: boolean;

  constructor(private rateCardService: RateCardService, private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.rateCards = this.rateCardService.getList();
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => this.isLoggedIn = user != null));
  }

  addRateCard() {
    if (this.rateCardName != null && this.rateCardName.length > 0) {
      this.rateCardService.create(this.rateCardName).then(card => this.router.navigate([ '/rate-cards', card.id ]));
    }
  }

}
