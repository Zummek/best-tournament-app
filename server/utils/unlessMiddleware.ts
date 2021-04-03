import { NextFunction, Request, Response } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export default function unless(middleware: Middleware, ...paths: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const pathCheck = paths.some((path) => path === req.path);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pathCheck ? next() : middleware(req, res, next);
  };
}
