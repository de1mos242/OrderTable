export class OrderGroupedPosition {
  name: string;
  price: number;
  totalAmount: number;

  static fromJson(data: any): OrderGroupedPosition {
    const inst = new OrderGroupedPosition();
    inst.name = data.name;
    inst.price = Number(data.price);
    inst.totalAmount = Number(data.total_amount);
    return inst;
  }
}
