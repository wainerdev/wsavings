import { Ecrypt } from "@shared/domain/ecrypt";
import { config } from "@shared/infrastructure/config";
import * as bycrpt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface GenerateTokenPayload {
  id: string;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EcryptService implements Ecrypt {
  async passwordEncrypt(pass: string) {
    return bycrpt.hashSync(pass, 10);
  }
  async comparePass(pass: string, hash: string) {
    return bycrpt.compareSync(pass, hash);
  }
  async generateToken(payload: GenerateTokenPayload) {
    return jwt.sign(payload, config.bcrypt.JSON_SECRET, { expiresIn: "1d" });
  }
}
