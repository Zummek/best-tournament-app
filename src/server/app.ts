import express from "express";
import morgan from "morgan";

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.static(`${__dirname}/public`));

app.use(express.json({ limit: "10kb" }));

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    err: "This path doesn't exist for now!",
  });
});

export default app;
