import { User } from './user.model';

export class OrderModel {
  name: string;
  id: number;
  owner: User;
  rateCards: number[];

  static fromJson(data: any): OrderModel {
    const event = new OrderModel();
    event.id = data.id;
    event.name = data.name;
    event.owner = User.fromJson(data.owner);
    event.rateCards = data.rate_cards;
    return event;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
      rate_cards: this.rateCards
    }
  }
}
