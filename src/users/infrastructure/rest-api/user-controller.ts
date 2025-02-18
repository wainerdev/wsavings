import { Request, Response } from "express";
import { UserService } from "../../application/user-service";
import { UserDtoMapper } from "../mapper/UserDtoMapper";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async saveTransaction(req: Request, res: Response) {
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

    await this.userService.save(mappedTransaction);

    res.status(200).send();
  }

  async findByUserId(req: Request, res: Response) {
    const { userId } = req.params;

    const transactions = await this.userService.findByUserId(
      userId
    );

    res.status(200).send(transactions);
  }
}
