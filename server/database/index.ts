import mongoose from 'mongoose';

export const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL!, {
      user: process.env.DB_DEV_USERNAME,
      pass: process.env.DB_DEV_PASSWORD,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection succesful');
    })
    .catch(() => {
      console.log('DB connection error: ');
    });
};
