import { PgCategory } from "@shared/infrastructure/databases/postgresql/models/PgCategory";
import { PgTransaction } from "@shared/infrastructure/databases/postgresql/models/PgTransaction";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { DataTypes, Model } from "sequelize";

export interface UserRow {
  id: number;
  fullName: string;
  balance: number;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserEntity = Omit<
  UserRow,
  "id" | "createdAt" | "updatedAt" | "isDeleted" | "balance"
>;

export class PgUser extends Model<UserRow, UserEntity> {
  declare id: number;
  declare fullName: string;
  declare balance: number;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare isDeleted: boolean;
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
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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

PgCategory.hasOne(PgTransaction, {
  foreignKey: "categoryId",
  as: "userCategory",
  onDelete: "CASCADE",
});

PgTransaction.belongsTo(PgCategory, {
  foreignKey: "categoryId",
  as: "categories",
});
