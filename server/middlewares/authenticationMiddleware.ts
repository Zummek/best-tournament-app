import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import catchAsync from '../utils/catchAsync';

export default catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
  });
  const token = req.cookies.validation_token;
  const decoded: any = jwt.decode(token, { complete: true });
  const key = await client.getSigningKey(decoded?.header.kid);
  const validToken: any = jwt.verify(token, key.getPublicKey());
  if (validToken) {
    req.decoded = {
      userMSId: validToken.oid,
    };
  } else {
    return res.status(401).json({
      message: 'Authentication failed',
    });
  }
  next();
});
