export class RateCardPosition {
  id: number;
  name: string;
  price: number;
  rateCardId: number;

  static fromJson(position: any): RateCardPosition {
    const inst = new RateCardPosition();
    inst.id = position.id;
    inst.name = position.name;
    inst.price = position.price;
    inst.rateCardId = position['rate_card_id'];
    return inst;
  }
}
