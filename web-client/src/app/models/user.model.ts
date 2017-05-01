export class User {
  id: number;
  username: string;
  orderEvents: string[];

  static fromJson(data: any): User {
    const user = new User();
    user.id = data.id;
    user.username = data.username;
    user.orderEvents = data.order_events;
    return user;
  }
}
