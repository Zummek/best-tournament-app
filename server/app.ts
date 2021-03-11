import express from "express";
import morgan from "morgan";
import userRouter from "./routes/api/userRoutes";
import cors from "cors";

import * as errorController from "./controllers/errorController";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/users", userRouter);

app.all("*", (_req, res) => {
  res.status(404).json({
    status: "error",
    err: "This path doesn't exist for now!",
  });
});

app.use(errorController.globalErrorHandler);

export default app;
