import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { DataTypes, Model } from "sequelize";

export interface TransactionRow {
  id: number;
  amount: number;
  description: string;
  userId: number;
  categoryId: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PgTransaction extends Model<
  TransactionRow,
  Omit<TransactionRow, "id" | "createdAt" | "updatedAt">
> {
  declare id: number;
  declare amount: number;
  declare description: string;
  declare userId: number;
  declare users: PgUser;
  declare categoryId: number;
  declare categories: PgCategory;
  declare type: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PgTransaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["I", "E"], // I = Income, E = Expense
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "transactions",
  }
);
