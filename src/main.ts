import "./shared/infrastructure/load-env-vars";
import "module-alias/register";

import { categoryRouter } from "@categories/infrastructure/rest-api/category-router";
import { config } from "@shared/infrastructure/config";
import { sequelize } from "@shared/infrastructure/databases/postgresql/sequelize";
import { transactionRouter } from "@transactions/infrastructure/rest-api/transaction-router";
import { userRouter } from "@users/infrastructure/rest-api/user-router";
import bodyParser from "body-parser";
import express from "express";

function bootstrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/users", userRouter);
  app.use("/transactions", transactionRouter);
  app.use("/categories", categoryRouter);

  const { port } = config.server;

  app.listen(port, () => {
    sequelize
      .sync({
        // force: true
      })
      .then(() => {
        console.log(`[APP] - Starting application on port ${port}`);
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Error on database connection", error);
      });
  });
}

bootstrap();
