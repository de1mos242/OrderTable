import { User } from './user.model';

export class OrderEvent {
  name: string;
  id: number;
  owner: User;

  static fromJson(data: any): OrderEvent {
    const event = new OrderEvent();
    event.id = data.id;
    event.name = data.name;
    event.owner = User.fromJson(data.owner);
    return event;
  }
}
