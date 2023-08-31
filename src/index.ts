import express from "express";
import "./config/env";
import property from "./routes/property.route";
import { connection } from "./database/dbconnection";
import { logger } from "./middleware/winsdon.middleware";
const app = express();
app.use(express.json());


const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(property);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  connection();
  logger.log({ level: "info", message: `server is running in ${port}` });
});
