import { EcryptService } from "@shared/infrastructure/auth/ecrypt";
import { config } from "@shared/infrastructure/config";
import { UserService } from "@users/application/user-service";
import { UserSignInDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signin-dto";
import { UserSignUpDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signup-dto";
import { CookieOptions, Request, Response } from "express";

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ecryptService: EcryptService
  ) {}

  async singIn(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const domainUser = UserSignInDtoMapper.toDomain(email);

    const foundUser = await this.userService.findByEmail(domainUser.email);

    if (!foundUser) {
      res.status(401).send({ message: "User not found" });
      return;
    }

    const isPasswordValid = await this.ecryptService.comparePass(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid password" });
      return;
    }

    const dtoUser = UserSignInDtoMapper.toDto(foundUser);

    const token = await this.ecryptService.generateToken({
      ...foundUser,
    });

    res.cookie(
      config.cookie.keyName,
      {
        user: dtoUser,
        token,
      },
      config.cookie.setCookie as CookieOptions
    );

    res.status(200).send({ user: dtoUser, token });
  }

  async singUp(req: Request, res: Response): Promise<void> {
    const { fullName, email, password } = req.body;

    const foundUser = await this.userService.findByEmail(email);

    if (foundUser) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    const scriptedPassword = await this.ecryptService.passwordEncrypt(password);

    const domainUser = UserSignUpDtoMapper.toDomain(
      email,
      fullName,
      scriptedPassword
    );

    const signedUser = await this.userService.singUp(domainUser);

    if (!signedUser) {
      res.status(400).send({ message: "User already exists" });
      return;
    }

    const dtoUser = UserSignUpDtoMapper.toDto(signedUser);

    res.status(200).send({
      user: dtoUser,
    });
  }

  async profile(req: Request, res: Response): Promise<void> {
    const { id } = req.authUser;

    const foundUser = await this.userService.profile(id);

    const dtoUser = UserSignUpDtoMapper.toDto(foundUser);

    res.status(200).send({
      user: dtoUser,
    });
  }

  async singOut(req: Request, res: Response): Promise<void> {
    res.clearCookie(config.cookie.keyName);

    res.status(200).send({});
  }
}
