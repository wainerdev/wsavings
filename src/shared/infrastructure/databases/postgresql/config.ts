import dotenv from "dotenv";
dotenv.config();

import { config } from "@shared/infrastructure/config";
import { Options } from "sequelize";

export const development: Options = {
  ...config.database,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
