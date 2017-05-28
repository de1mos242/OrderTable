export class OrderPayment {
  id: number;
  customerId: number;
  orderEventId: number;
  paidSum: number;

  static fromJson(payment: any): OrderPayment {
    const inst = new OrderPayment();
    inst.id = payment.id;
    inst.customerId = payment.customer;
    inst.orderEventId = payment.order_event;
    inst.paidSum = Number(payment.paid_sum);
    return inst;
  }

  toJson(): object {
    return {
      id: this.id,
      customer: this.customerId,
      order_event: this.orderEventId,
      paid_sum: this.paidSum,
    };
  }
}
