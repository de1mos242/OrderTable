export class UserCredentials {
  username: string;
  token: string;

  static fromString(str: string): UserCredentials {
    const storedData = JSON.parse(str);
    const userCredentials = new UserCredentials();
    userCredentials.username = storedData.username;
    userCredentials.token = storedData.token;
    return userCredentials;
  }

  toString(): string {
    return JSON.stringify(this);
  }

}
