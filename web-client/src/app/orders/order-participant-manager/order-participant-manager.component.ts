import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderModel } from '../../models/order-event.model';
import { UserService } from '../../backend/user.service';
import { OrderService } from '../../backend/order.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'ot-order-participant-manager',
  templateUrl: './order-participant-manager.component.html',
  styleUrls: [ './order-participant-manager.component.css' ]
})
export class OrderParticipantManagerComponent implements OnInit {

  _orderModel: OrderModel;
  nonParticipantUsers: User[];
  participants: User[];

  @Input()
  set orderModel(orderModel: OrderModel) {
    this._orderModel = orderModel;
  }

  @Output() onOrderRefreshed = new EventEmitter<OrderModel>();

  constructor(private userService: UserService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.refreshLists();
  }

  refreshLists() {
    this.userService.getUsers().toPromise().then(users => this.divideUsers(users));
  }

  private divideUsers(users: User[]) {
    this.participants = users.filter(user => this._orderModel.participants.indexOf(user.id) >= 0);
    this.nonParticipantUsers = users.filter(user => this._orderModel.participants.indexOf(user.id) < 0);
  }

  addParticipant(user: User) {
    this._orderModel.participants.push(user.id);
    this.updateOrder();
  }

  removeParticipant(user: User) {
    const userIdx = this._orderModel.participants.indexOf(user.id);
    if (userIdx < 0) {
      return;
    }
    this._orderModel.participants.splice(userIdx, 1);
    this.updateOrder();
  }

  updateOrder() {
    this.orderService.update(this._orderModel).then(orderModel => {
      this._orderModel = orderModel;
      this.refreshLists();
      this.onOrderRefreshed.emit(orderModel);
    });
  }
}
