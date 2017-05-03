import { User } from './user.model';

export class OrderModel {
  name: string;
  id: number;
  owner: User;

  static fromJson(data: any): OrderModel {
    const event = new OrderModel();
    event.id = data.id;
    event.name = data.name;
    event.owner = User.fromJson(data.owner);
    return event;
  }
}
