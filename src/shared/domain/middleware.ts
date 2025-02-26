import { NextFunction, Request, Response } from "express";

export interface Middleware {
  verifyUser(req: Request, res: Response, next: NextFunction): void;
}
