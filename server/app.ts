import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as errorController from './controllers/errorController';
import indexRouter from './routes';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(cors({
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use('/', indexRouter);

app.all('*', (_req, res) => {
  res.status(404).json({
    err: 'This path doesn\'t exist for now!',
  });
});

app.use(errorController.globalErrorHandler);

export default app;
