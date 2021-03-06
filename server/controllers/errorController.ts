import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/appError';
import log from '../utils/logger';

const handleDuplicateFieldsDB = () => {
  const message = 'Duplicate fields';
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please login again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please login again', 401);

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleCastErrorDB = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, _req: Request, res: Response) => {
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err: AppError, _req: Request, res: Response) => {
  // operational error - send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    // programming or other error
    res.status(500).json({
      message: 'Something went very wrong!',
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500; // default

  if (err.statusCode >= 500) {
    log.error(err.message, {
      error: err,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    // err.name = CastError w przypadku podania zupe??nie b????dnego id w requestcie
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    // error code for duplicate fields
    if (err.code === 11000) error = handleDuplicateFieldsDB();

    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }

    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }

    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
