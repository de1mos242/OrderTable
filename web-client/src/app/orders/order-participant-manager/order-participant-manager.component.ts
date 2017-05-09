import { Component, Input, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order-event.model';
import { UserService } from '../../backend/user.service';
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
  users: User[];

  @Input()
  set orderModel(orderModel: OrderModel) {
    this._orderModel = orderModel;
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().toPromise().then(users => {
      this.users = users;
      this.refreshLists();
    });
  }

  refreshLists() {
    this.divideUsers(this.users);
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
    this.refreshLists();
  }
}
