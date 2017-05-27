export class UserCredentials {
  tokenType: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
  acquiredAt: number;

  // {"access_token":"ATdQ5llHf0lXSj8U8NKDwZwkscWCY5",
  // "expires_in":36000,"token_type":"Bearer",
  // "scope":"read write","refresh_token":"Enwfpp4pQjiGk4W9sqmHtNW7SOHRwX"}


  static fromString(str: string): UserCredentials {
    const storedData = JSON.parse(str);
    const userCredentials = new UserCredentials();
    userCredentials.tokenType = storedData.tokenType;
    userCredentials.token = storedData.token;
    userCredentials.acquiredAt = storedData.acquiredAt;
    userCredentials.expiresIn = storedData.expiresIn;
    userCredentials.refreshToken = storedData.refreshToken;
    return userCredentials;
  }

  toString(): string {
    return JSON.stringify(this);
  }

}
