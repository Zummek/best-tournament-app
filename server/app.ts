import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as errorController from './controllers/errorController';
import indexRouter from './routes';
import httpLogger from './utils/httpLogger';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(httpLogger());

app.use(express.static(`${__dirname}/public`));

app.use(cors({
  credentials: true,
  origin: true,
}));

app.options('*', () => cors({
  credentials: true,
  origin: true,
}));

app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

app.use('/', indexRouter);

app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'This path doesn\'t exist',
  });
});

app.use(errorController.globalErrorHandler);

export default app;
