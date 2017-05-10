import { User } from './user.model';

export type OrderStatus = 'PREPARE'| 'BUILD' | 'SEND' | 'PAY' | 'CLOSE';

export class OrderModel {
  name: string;
  id: number;
  owner: User;
  rateCards: number[];
  participants: number[];
  status: OrderStatus;

  static getStatusLabel(value: OrderStatus): string {
    switch (value) {
      case 'PREPARE': return 'Подготовка';
      case 'BUILD': return 'Сборка';
      case 'SEND': return 'Заказ';
      case 'PAY': return 'Оплата';
      case 'CLOSE': return 'Закрыт';
      default: return 'Неизвестен';
    }
  }

  static fromJson(data: any): OrderModel {
    const event = new OrderModel();
    event.id = data.id;
    event.name = data.name;
    event.owner = User.fromJson(data.owner);
    event.rateCards = data.rate_cards;
    event.participants = data.participants;
    event.status = data.status;
    return event;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
      rate_cards: this.rateCards,
      participants: this.participants,
    }
  }
}
