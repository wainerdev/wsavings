import { Ecrypt } from "@shared/domain/ecrypt";
import { TokenPayload } from "@shared/domain/middleware";
import { config } from "@shared/infrastructure/config";
import * as bycrpt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class EcryptService implements Ecrypt {
  async passwordEncrypt(pass: string): Promise<string> {
    return bycrpt.hashSync(pass, 10);
  }
  async comparePass(pass: string, hash: string): Promise<boolean> {
    return bycrpt.compareSync(pass, hash);
  }
  async generateToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, config.bcrypt.JSON_SECRET, { expiresIn: "1d" });
  }
  async verifyToken(token: string): Promise<TokenPayload> {
    return jwt.verify(token, config.bcrypt.JSON_SECRET) as TokenPayload;
  }
}
