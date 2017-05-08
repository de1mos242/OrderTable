export class User {
  id: number;
  username: string;

  static fromJson(data: any): User {
    const user = new User();
    user.id = data.id;
    user.username = data.username;
    return user;
  }
}
