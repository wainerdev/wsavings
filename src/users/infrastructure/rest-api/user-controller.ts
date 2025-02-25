import {
  EcryptService,
  GenerateTokenPayload,
} from "@shared/application/ecrypt-service";
import { UserService } from "@users/application/user-service";
import { UserSignInDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signin-dto";
import { UserSignUpDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signup-dto";
import { Request, Response } from "express";
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ecryptService: EcryptService
  ) {}

  async singIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const domainUser = UserSignInDtoMapper.toDomain(email);

    const foundUser = await this.userService.findByEmail(domainUser.email);

    if (!foundUser) {
      return res.status(401).send({ message: "User not found" });
    }

    const isPasswordValid = await this.ecryptService.comparePass(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const dtoUser = UserSignInDtoMapper.toDto(foundUser);

    const token = await this.ecryptService.generateToken(
      dtoUser as GenerateTokenPayload
    );

    return res.status(200).send({ user: dtoUser, token });
  }

  async singUp(req: Request, res: Response) {
    const { fullName, email, password } = req.body;

    const foundUser = await this.userService.findByEmail(email);

    if (foundUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const scriptedPassword = await this.ecryptService.passwordEncrypt(password);

    const domainUser = UserSignUpDtoMapper.toDomain(
      email,
      fullName,
      scriptedPassword
    );

    const signedUser = await this.userService.singUp(domainUser);

    if (!signedUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const dtoUser = UserSignUpDtoMapper.toDto(signedUser);

    return res.status(200).send(dtoUser);
  }
}
