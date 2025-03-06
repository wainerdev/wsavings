export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly fullName: string,
    readonly balance: number,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
