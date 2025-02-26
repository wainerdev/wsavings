import { EcryptService } from "@shared/application/ecrypt-service";
import { Logger } from "@shared/domain/logger";
import { Middleware } from "@shared/domain/middleware";
import { UserRepositoryPort } from "@users/domain/user-repository-port";
import { NextFunction, Request, Response } from "express";

const SERVICE_NAME = "[Middleware Service]";

export class MiddlewareService implements Middleware {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly logger: Logger,
    private readonly ecryptService: EcryptService
  ) {}
  async verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.cookies.token;
      if (!token) {
        this.logger.info(
          `${SERVICE_NAME} Token not found in the request cookies.`
        );

        res.status(401).send({ message: "Unauthorized" });
      }

      const validToken = await this.ecryptService.verifyToken(token);

      if (!validToken) {
        this.logger.info(`${SERVICE_NAME} Token is invalid.`);

        res.status(401).send({ message: "Unauthorized" });
      }

      const foundUser = this.userRepository.findByEmail(validToken.email);

      if (!foundUser) {
        this.logger.info(`${SERVICE_NAME} User not found.`);

        res.status(401).send({ message: "Unauthorized" });
      }

      this.logger.info(`${SERVICE_NAME} User found.`);

      next();
    } catch (error) {
      console.error(error);
      this.logger.error(
        `${SERVICE_NAME} Error while verifying user in the middleware.`
      );
      res.status(401).send({ message: "Unauthorized" });
    }
  }
}
