export class UserCredentials {
  tokenType: string;
  token: string;

  static fromString(str: string): UserCredentials {
    const storedData = JSON.parse(str);
    const userCredentials = new UserCredentials();
    userCredentials.tokenType = storedData.tokenType;
    userCredentials.token = storedData.token;
    return userCredentials;
  }

  toString(): string {
    return JSON.stringify(this);
  }

}
