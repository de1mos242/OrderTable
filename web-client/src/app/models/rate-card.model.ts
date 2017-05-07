import { RateCardPosition } from './rate-card-position.model';
export class RateCard {
  id: number;
  name: string;
  positions: RateCardPosition[];

  static fromJson(data: any): RateCard {
    const inst = new RateCard();
    inst.id = data.id;
    inst.name = data.name;
    inst.positions = data.positions.map(position => RateCardPosition.fromJson(position));
    return inst;
  }

  toJson(): object {
    return {
      id: this.id,
      name: this.name,
      positions: this.positions,
    }
  }

}
