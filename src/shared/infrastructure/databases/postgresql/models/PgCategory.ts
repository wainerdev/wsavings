import { DataTypes, Model } from "sequelize";

import { sequelize } from "../sequelize";
import { PgUser } from "./PgUser";

export interface CategoryRow {
  id: number;
  title: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryEntity = Omit<
  CategoryRow,
  "id" | "createdAt" | "updatedAt"
>;

export class PgCategory extends Model<CategoryRow, CategoryEntity> {
  declare id: number;
  declare title: string;
  declare userId: number;
  declare users: PgUser;
  declare createdAt: Date;
  declare updatedAt: Date;
}

PgCategory.init(
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
    title: {
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
    tableName: "categories",
  }
);
