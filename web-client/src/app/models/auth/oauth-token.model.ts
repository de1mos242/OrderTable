export type TokenType = 'Bearer';

export class OAuthToken {
  access_token: string;
  expires_in: number;
  token_type: TokenType;
  scope: string;
  refresh_token: string;
}
