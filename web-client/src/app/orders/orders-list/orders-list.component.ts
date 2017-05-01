import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderEventService } from '../../backend/order-event.service';
import { OrderEvent } from '../../models/order-event.model';

@Component({
  selector: 'ot-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: [ './orders-list.component.css' ]
})
export class OrdersListComponent extends BaseComponent implements OnInit {

  orders: OrderEvent[] = [];

  constructor(private orderEventService: OrderEventService) {
    super();
  }

  ngOnInit() {
    const sub = this.orderEventService.getList().subscribe(orders => this.orders = orders);
    this.subscribed(sub);
  }

}
