import { NextFunction, Request, Response } from "express";

export interface TokenPayload {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Middleware {
  verifyUser(req: Request, res: Response, next: NextFunction): void;
  updateToken(req: Request, res: Response, next: NextFunction): void;
}
