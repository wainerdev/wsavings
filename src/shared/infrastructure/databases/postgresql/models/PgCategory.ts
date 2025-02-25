import { PgUser } from "@shared/infrastructure/databases/postgresql/models/PgUser";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { DataTypes, Model } from "sequelize";

export interface CategoryRow {
  id: number;
  title: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export type CategoryEntity = Omit<
  CategoryRow,
  "id" | "createdAt" | "updatedAt" | "isDeleted"
>;

export class PgCategory extends Model<CategoryRow, CategoryEntity> {
  declare id: number;
  declare title: string;
  declare userId: number;
  declare users: PgUser;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare isDeleted: boolean;
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
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
