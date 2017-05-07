import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from '../../models/order-event.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../../backend/order.service';
import { RateCard } from '../../models/rate-card.model';
import { RateCardService } from '../../backend/rate-card.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime'

@Component({
  selector: 'ot-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: [ './order-edit.component.css' ],
})
export class OrderEditComponent extends BaseComponent implements OnInit {

  orderModel: OrderModel;

  linkedRateCards: RateCard[];

  currentUser: User;
  searchCardControl: FormControl = new FormControl();
  notLinkedCards: Observable<RateCard[]>;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private orderService: OrderService,
              private rateCardService: RateCardService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data
                        .subscribe((data: { orderModel: OrderModel }) => {
                          this.orderModel = data.orderModel;
                          this.refreshRateCards(this.orderModel);
                        }));
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => this.currentUser = user));
    this.notLinkedCards = this.searchCardControl.valueChanges.startWith(null)
                              .debounceTime(300)
                              .switchMap(val => this.rateCardService.getFilteredList({
                                name: val
                              })).map(cards => this.filterAlreadyAdded(cards))
  }

  isOwner() {
    if (this.currentUser != null && this.orderModel != null) {
      return this.currentUser.id === this.orderModel.owner.id;
    }
  }

  onSubmit() {
    this.orderModel.rateCards = this.linkedRateCards.map(card => card.id);
    this.orderService.update(this.orderModel).then(card => this.router.navigate([ '/orders', card.id ]));
  }

  private refreshRateCards(orderModel: OrderModel) {
    this.rateCardService.getByOrder(orderModel.id).then(rateCards => this.linkedRateCards = rateCards);
  }

  removeCardAtIdx(idx: number) {
    this.linkedRateCards.splice(idx, 1);
  }

  getRateCardName(card: RateCard): string {
    return card ? card.name : '';
  }

  addRateCard(card: RateCard) {
    this.linkedRateCards.push(card);
    this.searchCardControl.patchValue('');
  }

  private filterAlreadyAdded(cards: RateCard[]): RateCard[] {
    return cards.filter(
      card => this.linkedRateCards.filter(
        linkedCard => linkedCard.id === card.id
      ).length === 0
    );
  }
}
