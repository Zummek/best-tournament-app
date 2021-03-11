import { IAppError } from './../../shared/types/IAppError'

class AppError extends Error implements IAppError{
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; //czyli wynikajace nie z bledow w kodzie
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
export default AppError;