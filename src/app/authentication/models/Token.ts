
/*
* This interface represents the token came from the backend
* */
export interface Token{
  sub: string;
  authorities: string[];
  iat: number;
  exp: number;
}
