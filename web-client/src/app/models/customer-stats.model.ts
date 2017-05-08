import { User } from './user.model';
export class CustomerStats {

  customer: User;

  totalSum: number;

  static fromJson(data: any): CustomerStats {
    const inst = new CustomerStats();
    inst.customer = User.fromJson(data.customer);
    inst.totalSum = Number(data.total_sum);
    return inst;
  }
}
