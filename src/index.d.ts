import { TokenPayload } from "@shared/domain/middleware";

declare module "express-serve-static-core" {
  interface Request {
    authUser: TokenPayload;
  }
}
