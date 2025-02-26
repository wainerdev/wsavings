import { TokenPayload } from "@shared/domain/middleware";

export interface Ecrypt {
  passwordEncrypt(pass: string): Promise<string>;
  comparePass(pass: string, hash: string): Promise<boolean>;
  generateToken(payload: TokenPayload): Promise<string>;
  verifyToken(token: string): Promise<TokenPayload>;
}
