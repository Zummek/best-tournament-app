/* eslint-disable no-console */
import mongoose from 'mongoose';

// eslint-disable-next-line import/prefer-default-export
export const connectDatabase = () => {
  const uri = `mongodb://${process.env.DB_DEV_HOST}:${process.env.DB_DEV_PORT}/${process.env.DB_DEV_DATABASE}?authSource=admin`;

  mongoose
    .connect(uri, {
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
    .catch((error) => {
      console.log('DB connection error', error);
    });
};
