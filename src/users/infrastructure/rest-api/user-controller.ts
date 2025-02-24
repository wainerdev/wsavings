import { UserService } from "@users/application/user-service";
import { UserSignInDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signin-dto";
import { UserSignUpDtoMapper } from "@users/infrastructure/rest-api/mapper/user-signup-dto";
import { Request, Response } from "express";
export class UserController {
  constructor(private readonly userService: UserService) {}

  async singIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const mappedUser = UserSignInDtoMapper.toDomain(email, password);

    await this.userService.singIn(mappedUser);

    res.status(200).send();
  }

  async singUp(req: Request, res: Response) {
    const { fullName, email, password } = req.body;

    const mappedUser = UserSignUpDtoMapper.toDomain(email, fullName, password);

    await this.userService.singIn(mappedUser);

    res.status(200).send();
  }
}
