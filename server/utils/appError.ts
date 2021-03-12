import { IAppError } from '../../shared/types/IAppError';

class AppError extends Error implements IAppError {
  statusCode: number;

  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // czyli wynikajace nie z bledow w kodzie

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
