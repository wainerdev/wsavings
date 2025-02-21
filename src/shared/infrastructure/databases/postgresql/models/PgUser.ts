import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { DataTypes, Model } from "sequelize";

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

PgUser.hasOne(PgCategory, {
  foreignKey: "userId",
  as: "userCategory",
  onDelete: "CASCADE",
});

PgCategory.belongsTo(PgUser, {
  foreignKey: "userId",
  as: "users",
});

PgUser.hasOne(PgTransaction, {
  foreignKey: "userId",
  as: "userTransaction",
  onDelete: "CASCADE",
});

PgTransaction.belongsTo(PgUser, {
  foreignKey: "userId",
  as: "users",
});
