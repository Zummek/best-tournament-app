import dotenv from "dotenv";
// import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

// eslint-disable-next-line import/first
import app from "./app";

const port = process.env.PORT || 4000;

// mongoose
//   .connect(process.env.DATABASE!, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB connection succesful");
//   });

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
