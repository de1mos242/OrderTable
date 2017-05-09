import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base-component/base-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from '../../models/order-event.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../../backend/order.service';

@Component({
  selector: 'ot-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: [ './order-edit.component.css' ],
})
export class OrderEditComponent extends BaseComponent implements OnInit {

  orderModel: OrderModel;

  currentUser: User;

  invitationToken: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private orderService: OrderService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscribed(this.route.data
                        .subscribe((data: { orderModel: OrderModel }) => this.orderModel = data.orderModel));
    this.subscribed(this.authService.onAuthUpdate()
                        .subscribe(user => this.currentUser = user));
  }

  isOwner() {
    if (this.currentUser != null && this.orderModel != null) {
      return this.currentUser.id === this.orderModel.owner.id;
    }
  }

  onSubmit() {
    this.orderService.update(this.orderModel).then(card => this.router.navigate([ '/orders', card.id ]));
  }

  requestInvitationToken() {
    this.orderService.requestInvitationToken(this.orderModel.id).then(token => this.invitationToken = token);
  }
}
