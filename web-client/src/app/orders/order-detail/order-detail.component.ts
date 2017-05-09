import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderModel } from '../../models/order-event.model';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { OrderGroupedPosition } from '../../models/order-grouped-position.model';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../backend/order.service';
import { CustomerStats } from '../../models/customer-stats.model';

@Component({
  selector: 'ot-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [ './order-detail.component.css' ]
})
export class OrderDetailComponent extends BaseComponent implements OnInit {

  orderModel: OrderModel;

  currentUser: User;

  groupedPositions: Observable<OrderGroupedPosition[]>;

  customersStats: CustomerStats[];

  constructor(private route: ActivatedRoute, private authService: AuthService, private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data.subscribe((data: { orderModel: OrderModel }) => this.onUpdateOrderModel(data)));
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => this.currentUser = user));
  }

  private onUpdateOrderModel(data: { orderModel: OrderModel }) {
    this.orderModel = data.orderModel;
    this.groupedPositions = this.orderService.getGroupedPositions(this.orderModel);
    this.subscribed(this.orderService.getCustomerStats(this.orderModel)
                        .subscribe(stats => this.customersStats = stats));
  }

  isOwner() {
    if (this.currentUser != null && this.orderModel != null) {
      return this.currentUser.id === this.orderModel.owner.id;
    }
    return false;
  }

  canEditPositions() {
    if (this.isOwner()) {
      return true;
    }
    if (this.currentUser != null && this.orderModel != null) {
      return this.orderModel.participants.indexOf(this.currentUser.id) >= 0;
    }
    return false;
  }

  getOrderTotalSum(): number {
    if (this.customersStats == null) {
      return 0;
    }
    return this.customersStats.reduce((previousValue, currentValue) => previousValue + currentValue.totalSum, 0);
  }

}
