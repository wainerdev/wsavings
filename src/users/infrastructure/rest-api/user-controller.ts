import { UserService } from "@users/application/user-service";
import { UserDtoMapper } from "@users/infrastructure/rest-api/mapper/user-dto";
import { Request, Response } from "express";
export class UserController {
  constructor(private readonly userService: UserService) {}

  async singIn(req: Request, res: Response) {
    const today = new Date();
    const { email, password } = req.body;

    const mappedTransaction = UserDtoMapper.toDomain(
      0, // id - not needed for sign in
      email,
      "", // fullName - not needed for sign in
      password,
      today, // createdAt
      today // updatedAt
    );

    await this.userService.singIn(mappedTransaction);

    res.status(200).send();
  }

  async singUp(req: Request, res: Response) {
    const today = new Date();
    const { id, fullName, email, password } = req.body;

    const mappedTransaction = UserDtoMapper.toDomain(
      id,
      email,
      fullName,
      password,
      today, // createdAt
      today // updatedAt
    );

    await this.userService.singIn(mappedTransaction);

    res.status(200).send();
  }
}
