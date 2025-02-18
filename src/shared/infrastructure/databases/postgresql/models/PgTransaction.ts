import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { PgUser } from "./PgUser";

interface TransactionRow {
  id: number;
  user: string;
  amount: number;
  description: string;
  type: string;
}

export class PgTransaction extends Model<
  TransactionRow,
  Omit<TransactionRow, "id">
> {
  declare id: number;
  declare user: string;
  declare amount: number;
  declare description: string;
  declare type: string;
}

PgTransaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user: {
      type: DataTypes.STRING,
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
    }
  },
  {
    sequelize,
    timestamps: true,
    tableName: "transactions",
  }
);

PgTransaction.belongsTo(PgUser)



