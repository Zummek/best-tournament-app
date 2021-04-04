import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
// import { verifyAzureToken } from 'azure-ad-jwt-lite';
// import jwksClient from 'jwks-rsa';

export default async (req: Request, res: Response, next: NextFunction) => {
  let token = '';

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    return res.status(401).json({
      message: 'Authentication failed',
    });
  }

  // TU JEST NAJLEPSZY SPOSOB ALE NO AAAAAAAAA MS SPAPRAŁ ROBOTE
  // const decoded = await verifyAzureToken(token, {
  //   issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`,
  //   audience: `api://${process.env.CLIENT_ID}/user.read`,
  // }) as any;
  // OPCJA NR 2 lub 1
  // const decoded = await verifyAzureToken(token) as any;

  // req.decoded = {
  //   userMSId: decoded.tid as string,
  // };
  // next();

  // TUTAJ również poprawna bardziej basic opcja
  /* const client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/keys`,
    // jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
  });
  function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }

      const signingKey = key.getPublicKey();
      console.log('signingKey', signingKey);
      callback(err, signingKey);
    });
  }
*/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded = jwt.decode(token) as any;

  if (!decoded) {
    return res.status(401).json({
      message: 'Authentication failed',
    });
  }

  req.decoded = {
    userMSId: decoded.tid,
  };

  next();
};
