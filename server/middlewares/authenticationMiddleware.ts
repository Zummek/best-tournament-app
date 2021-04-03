import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

export default (req: Request, res: Response, next: NextFunction) => {
  let token = '';

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return res.status(401).json({
      message: 'Authentication failed',
    });
  }

  const client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/keys`,
  });
  function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }

      const signingKey = key.getPublicKey();
      callback(err, signingKey);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.verify(token, getKey, (err, decodedToken: any) => {
    if (err || !decodedToken) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }

    req.decoded = {
      userMSId: decodedToken.tid as string,
    };
    next();
  });
};
