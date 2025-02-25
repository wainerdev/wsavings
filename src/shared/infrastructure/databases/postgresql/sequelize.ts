import { development } from "@shared/infrastructure/databases/postgresql/config";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(development);
