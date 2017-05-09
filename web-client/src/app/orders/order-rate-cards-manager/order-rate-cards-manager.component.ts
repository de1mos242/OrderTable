import { Component, Input, OnInit } from '@angular/core';
import { RateCard } from '../../models/rate-card.model';
import { OrderModel } from '../../models/order-event.model';
import { RateCardService } from '../../backend/rate-card.service';
import { BaseComponent } from '../../shared/base-component/base-component.component';

@Component({
  selector: 'ot-order-rate-cards-manager',
  templateUrl: './order-rate-cards-manager.component.html',
  styleUrls: [ './order-rate-cards-manager.component.css' ]
})
export class OrderRateCardsManagerComponent extends BaseComponent implements OnInit {

  @Input()
  set orderModel(orderModel: OrderModel) {
    this._orderModel = orderModel;
    this.divideRateCards();
  }

  _orderModel: OrderModel;
  rateCards: RateCard[] = [];
  linkedRateCards: RateCard[];
  notLinkedRateCards: RateCard[];

  constructor(private rateCardService: RateCardService) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.rateCardService.getList().subscribe(cards => {
      this.rateCards = cards;
      this.divideRateCards();
    }));
  }

  divideRateCards() {
    if (this.rateCards != null && this._orderModel != null) {
      this.linkedRateCards = this.rateCards.filter((value) => this._orderModel.rateCards.indexOf(value.id) >= 0);
      this.notLinkedRateCards = this.rateCards.filter((value) => this._orderModel.rateCards.indexOf(value.id) < 0);
    }
  }

  removeCard(card: RateCard) {
    const cardIdx = this._orderModel.rateCards.indexOf(card.id);
    if (cardIdx >= 0) {
      this._orderModel.rateCards.splice(cardIdx, 1);
      this.divideRateCards();
    }
  }

  addRateCard(card: RateCard) {
    if (this._orderModel.rateCards.indexOf(card.id) < 0) {
      this._orderModel.rateCards.push(card.id);
      this.divideRateCards();
    }
  }

  //
  // private refreshRateCards(orderModel: OrderModel) {
  //   this.rateCardService.getByOrder(orderModel.id).then(rateCards => this.linkedRateCards = rateCards);
  // }
  //
  // removeCardAtIdx(idx: number) {
  //   this.linkedRateCards.splice(idx, 1);
  // }
  //
  // getRateCardName(card: RateCard): string {
  //   return card ? card.name : '';
  // }
  //
  // addRateCard(card: RateCard) {
  //   this.linkedRateCards.push(card);
  //   this.searchCardControl.patchValue('');
  // }

}
