import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";
import { PgTransaction } from "./PgTransaction";

export interface UserRow {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export class PgUser extends Model<UserRow, Omit<UserRow, "id">> {
  declare id: number;
  declare fullName: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PgUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "users",
  }
);

PgUser.hasMany(PgTransaction, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "transactions",
});

PgTransaction.belongsTo(PgUser, {
  foreignKey: "userId",
  targetKey: "id",
  as: "users",
});

