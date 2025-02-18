import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

interface UserRow {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export class PgUser extends Model<UserRow, Omit<UserRow, "id">> {
  declare id: number;
  declare email: string;
  declare password: string;
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
