export class User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;

  static fromJson(data: any): User {
    const user = new User();
    user.id = data.id;
    user.username = data.username;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    return user;
  }
}
