export interface Token{
  sub: string;
  authorities: string[];
  iat: number;
  exp: number;
}
