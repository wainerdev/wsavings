import { Logger } from "@shared/domain/logger";
import { Middleware } from "@shared/domain/middleware";
import { EcryptService } from "@shared/infrastructure/auth/ecrypt";
import { config } from "@shared/infrastructure/config";
import { UserRepositoryPort } from "@users/domain/user-repository-port";
import { CookieOptions, NextFunction, Request, Response } from "express";

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
      const token = req.cookies[config.cookie.keyName].token;
      if (!token) {
        this.logger.info(
          `${SERVICE_NAME} Token not found in the request cookies.`
        );

        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      const validToken = await this.ecryptService.verifyToken(token);

      if (!validToken) {
        this.logger.info(`${SERVICE_NAME} Token is invalid.`);

        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      const foundUser = await this.userRepository.findByEmail(validToken.email);

      if (!foundUser) {
        this.logger.info(`${SERVICE_NAME} User not found.`);

        res.status(401).send({ message: "Unauthorized" });
        return;
      }

      this.logger.info(`${SERVICE_NAME} User found.`);

      req.authUser = foundUser;

      next();
    } catch (error) {
      console.error(error);
      this.logger.error(
        `${SERVICE_NAME} Error while verifying user in the middleware.`
      );
      res.status(401).send({ message: "Unauthorized" });
    }
  }

  async updateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    this.logger.info(`${SERVICE_NAME} Updating token.`);
    const token = await this.ecryptService.generateToken({
      ...req.authUser,
    });

    res.cookie(
      config.cookie.keyName,
      {
        user: req.authUser,
        token,
        renew: new Date(),
      },
      config.cookie.setCookie as CookieOptions
    );

    this.logger.info(`${SERVICE_NAME} Token updated.`);

    next();
  }
}
