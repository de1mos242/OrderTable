import { User } from './user.model';
export class OrderPosition {
  id: number;
  name: string;
  price: number;
  amount: number;
  rateCardPositionId: number;
  orderEventId: number;
  customer: User;

  static fromJson(position: any): OrderPosition {
    const inst = new OrderPosition();
    inst.id = position.id;
    inst.name = position.name;
    inst.price = Number(position.price);
    inst.amount = Number(position.amount);
    inst.rateCardPositionId = position.rate_card_position;
    inst.orderEventId = position.order_event;
    inst.customer = User.fromJson(position.customer);
    return inst;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      amount: this.amount,
      rate_card_position: this.rateCardPositionId,
      order_event: this.orderEventId,
    };
  }
}
