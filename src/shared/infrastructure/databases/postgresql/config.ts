import dotenv from 'dotenv';
dotenv.config();

import { Options } from "sequelize";
import { config } from "../../config";

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
