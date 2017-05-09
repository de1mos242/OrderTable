import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { RateCard } from '../../models/rate-card.model';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'ot-rate-card-detail',
  templateUrl: './rate-card-detail.component.html',
  styleUrls: [ './rate-card-detail.component.css' ]
})
export class RateCardDetailComponent extends BaseComponent implements OnInit {
  rateCard: RateCard;
  currentUser: User;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data.subscribe((data: { rateCard: RateCard }) => this.rateCard = data.rateCard));
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => this.currentUser = user));
  }

  isOwner(): boolean {
    if (this.currentUser == null || this.rateCard == null) {
      return false;
    }
    return this.currentUser.id === this.rateCard.owner.id;
  }

}
