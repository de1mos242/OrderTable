import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { RateCard } from '../../models/rate-card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RateCardPosition } from '../../models/rate-card-position.model';
import { RateCardService } from '../../backend/rate-card.service';

@Component({
  selector: 'ot-rate-card-edit',
  templateUrl: './rate-card-edit.component.html',
  styleUrls: [ './rate-card-edit.component.css' ]
})
export class RateCardEditComponent extends BaseComponent implements OnInit {
  rateCard: RateCard;
  newItemName: string;
  newItemPrice: number;

  constructor(private route: ActivatedRoute, private rateCardService: RateCardService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data.subscribe((data: { rateCard: RateCard }) => this.rateCard = data.rateCard));
  }

  addNewCard() {
    if (this.newItemName.length > 0 && this.newItemPrice > 0) {
      const pos = new RateCardPosition();
      pos.name = this.newItemName;
      pos.price = this.newItemPrice;
      this.rateCard.positions.push(pos);

      this.newItemPrice = 0;
      this.newItemName = '';
    }

  }

  removePosition(idx: number) {
    this.rateCard.positions.splice(idx, 1);
  }

  onSubmit() {
    this.rateCardService.update(this.rateCard).then(card => this.router.navigate([ '/rate-cards', card.id ]));
  }
}
