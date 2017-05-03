import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { OrderModel } from '../../models/order-event.model';

@Component({
  selector: 'ot-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [ './order-detail.component.css' ]
})
export class OrderDetailComponent extends BaseComponent implements OnInit {

  orderModel: OrderModel;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data
                        .subscribe((data: { orderModel: OrderModel }) => this.orderModel = data.orderModel));
  }

}
