import { Component, OnInit } from '@angular/core';
import { OrderPositionService } from '../../backend/order-position.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderModel } from '../../models/order-event.model';
import { OrderPosition } from '../../models/order-position.model';
import { RateCardPosition } from '../../models/rate-card-position.model';
import { RateCardPositionService } from '../../backend/rate-card-position.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ot-order-positions-edit',
  templateUrl: './order-positions-edit.component.html',
  styleUrls: [ './order-positions-edit.component.css' ]
})
export class OrderPositionsEditComponent extends BaseComponent implements OnInit {

  orderModel: OrderModel;

  orderPositions: OrderPosition[] = [];
  rateCardPositions: RateCardPosition[] = [];
  amounts: number[] = [];
  currentUser: User;

  constructor(private orderPositionService: OrderPositionService,
              private route: ActivatedRoute,
              private rateCardPositionService: RateCardPositionService,
              private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data
                        .subscribe((data: { orderModel: OrderModel }) => {
                          this.orderModel = data.orderModel;
                          this.refreshPositions(this.orderModel);
                          this.refreshRateCardPositions(this.orderModel)
                        }));
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => this.currentUser = user));
  }

  private refreshPositions(model: OrderModel) {
    this.orderPositionService.getFilteredList({ order_id: model.id })
        .then(positions => this.orderPositions = positions);
  }

  private refreshRateCardPositions(model: OrderModel) {
    this.rateCardPositionService.getFilteredList({ rate_card_ids: model.rateCards.join(',') })
        .then(positions => {
          this.rateCardPositions = positions;
          this.amounts = new Array(positions.length).fill(1);
        });
  }

  addPosition(ratePosition: RateCardPosition, amount: number) {
    const amountNumber = Number(amount);
    if (amountNumber === 0) {
      return;
    }
    const currentUserId = this.currentUser ? this.currentUser.id : -1;
    let orderPosition = this.orderPositions.find(
      op => op.rateCardPositionId === ratePosition.id && op.customer.id === currentUserId);
    if (orderPosition != null) {
      orderPosition.amount += amountNumber;
      this.orderPositionService.updatePosition(orderPosition).then(pos => this.refreshPositions(this.orderModel));
    } else {
      orderPosition = new OrderPosition();
      orderPosition.name = ratePosition.name;
      orderPosition.price = ratePosition.price;
      orderPosition.rateCardPositionId = ratePosition.id;
      orderPosition.amount = amountNumber;
      orderPosition.orderEventId = this.orderModel.id;

      this.orderPositionService.addPosition(orderPosition).then(pos => this.refreshPositions(this.orderModel));
    }
  }

  removePosition(position: OrderPosition) {
    this.orderPositionService.removePosition(position).then(res => this.refreshPositions(this.orderModel));
  }
}
