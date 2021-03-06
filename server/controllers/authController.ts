import { Request, Response } from 'express';
import * as msal from '@azure/msal-node';
import catchAsync from '../utils/catchAsync';
import logger from '../utils/logger';

interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  sameSite?: 'lax' | 'none' | 'strict' | undefined | boolean;
  secure?: boolean;
}

const cookieOptions: CookieOptions = {
  expires: new Date(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN_HOURS! * 60 * 60 * 1000,
  ),
  httpOnly: false,
  sameSite: 'strict',
};

const placeTokenInCookie = (token: string, req: Request, res: Response, tokenName: string) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') { cookieOptions.secure = true; }

  res.cookie(tokenName, token, cookieOptions);
};

const config = {
  auth: {
    clientId: `${process.env.CLIENT_ID}`,
    authority: `${process.env.AUTHORITY_URL}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    nonce: 123,
  },
  system: {
    loggerOptions: {
      loggerCallback(_loglevel: unknown, message: string) {
        logger.info(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const loggingSession = new msal.ConfidentialClientApplication(config);

export const login = catchAsync(
  async (req: Request, res: Response) => {
    const authCodeUrlParameters = {
      scopes: ['openid'],
      redirectUri: `${process.env.SSL === 'true' ? 'https' : 'http'}://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/login`,
    };

    const authSessionURL = await loggingSession.getAuthCodeUrl(
      authCodeUrlParameters,
    );

    res.status(200).json({
      data: authSessionURL,
    });
  },
);

export const getToken = catchAsync(
  async (req: Request, res: Response) => {
    const tokenRequest = {
      code: req.body.code as string,
      scopes: ['openid'],
      nonce: 123,
      redirectUri: 'http://localhost:8080/login',
    };
    const token = await loggingSession.acquireTokenByCode(tokenRequest);
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed',
      });
    }
    placeTokenInCookie(token.accessToken, req, res, 'jwt');
    placeTokenInCookie(token.idToken, req, res, 'validation_token');
    return res.status(200).end();
  },
);
