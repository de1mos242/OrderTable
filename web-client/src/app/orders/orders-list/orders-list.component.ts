import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderService } from '../../backend/order.service';
import { OrderModel } from '../../models/order-event.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ot-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: [ './orders-list.component.css' ]
})
export class OrdersListComponent extends BaseComponent implements OnInit {

  orders: OrderModel[] = [];

  orderName: string;

  isLoggedIn: boolean;

  constructor(private orderEventService: OrderService, private router: Router, private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.updateOrders();

    this.subscribed(this.authService.onAuthUpdate().subscribe(user => {
      this.isLoggedIn = user != null;
      this.updateOrders();
    }));
  }

  private updateOrders() {
    this.orderEventService.getList().toPromise().then(orders => this.orders = orders);
  }

  addOrder() {
    if (this.orderName != null && this.orderName.length > 0) {
      this.orderEventService.create(this.orderName).then(order => this.router.navigate([ '/orders', order.id ]));
    }
  }

}
