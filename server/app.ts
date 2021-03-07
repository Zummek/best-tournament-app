import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/api/userRoutes';

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    err: "This path doesn't exist for now!",
  });
});

export default app;
