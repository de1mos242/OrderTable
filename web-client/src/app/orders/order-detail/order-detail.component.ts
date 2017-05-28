import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderModel, OrderStatus } from '../../models/order-event.model';
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

  totalSum = 0;
  totalPaidSum = 0;
  canEditPayments = false;
  canEditPositions = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private orderService: OrderService) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data.subscribe((data: { orderModel: OrderModel }) => this.onUpdateOrderModel(data)));
    this.subscribed(this.authService.onAuthUpdate().subscribe(user => {
      this.currentUser = user;
      if (this.orderModel != null) {
        this.updatePermissions();
      }
    }));
  }

  private onUpdateOrderModel(data: { orderModel: OrderModel }) {
    this.orderModel = data.orderModel;
    this.groupedPositions = this.orderService.getGroupedPositions(this.orderModel);
    this.updateStats();
    this.updatePermissions();
  }

  updateStats() {
    this.orderService.getCustomerStats(this.orderModel).toPromise().then(stats => {
      this.customersStats = stats;
      this.updateTotals();
    });
  }

  updateTotals() {
    this.totalSum = this.getOrderTotalSum();
    this.totalPaidSum = this.getOrderTotalPaidSum();
  }

  isOwner() {
    if (this.currentUser != null && this.orderModel != null) {
      return this.currentUser.id === this.orderModel.owner.id;
    }
    return false;
  }

  checkCanEditPositions() {
    if (this.orderModel.status !== 'BUILD') {
      return false;
    }
    if (this.isOwner()) {
      return true;
    }
    if (this.currentUser != null && this.orderModel != null) {
      return this.orderModel.participants.indexOf(this.currentUser.id) >= 0;
    }
    return false;
  }

  checkCanEditPayments() {
    if (this.orderModel.status !== 'PAY') {
      return false;
    }
    if (this.isOwner()) {
      return true;
    }
    return false;
  }

  private getTransitionsMap() {
    const map: { from: OrderStatus, to: OrderStatus }[] = [
      { from: 'PREPARE', to: 'BUILD' },
      { from: 'BUILD', to: 'SEND' },
      { from: 'SEND', to: 'BUILD' },
      { from: 'SEND', to: 'PAY' },
      { from: 'PAY', to: 'BUILD' },
      { from: 'PAY', to: 'CLOSE' },
      { from: 'CLOSE', to: 'PAY' },
    ];
    return map;
  }

  getActionsList(): OrderStatus[] {
    if (!this.isOwner()) {
      return [];
    }
    return this.getTransitionsMap()
               .filter(value => value.from === this.orderModel.status, this)
               .map(value => value.to);
  }

  setStatus(newStatus: OrderStatus) {
    this.orderService.setStatus(this.orderModel.id, newStatus).then(order => {
      this.onUpdateOrderModel({orderModel: order});
    });
  }

  private getOrderTotalPaidSum() {
    if (this.customersStats == null) {
      return 0;
    }
    return this.customersStats.reduce((previousValue, currentValue) => previousValue + currentValue.paidSum, 0);
  }

  private getOrderTotalSum(): number {
    if (this.customersStats == null) {
      return 0;
    }
    return this.customersStats.reduce((previousValue, currentValue) => previousValue + currentValue.totalSum, 0);
  }


  private updatePermissions() {
    this.canEditPayments = this.checkCanEditPayments();
    this.canEditPositions = this.checkCanEditPositions();
  }
}
