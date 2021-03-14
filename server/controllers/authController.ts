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
  httpOnly: true,
  sameSite: 'strict',
};

const placeTokenInCookie = (token: msal.AuthenticationResult, req: Request, res: Response) => {
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') { cookieOptions.secure = true; } else cookieOptions.secure = false;

  res.cookie('jwt', token.accessToken, cookieOptions);
};

const config = {
  auth: {
    clientId: `${process.env.CLIENT_ID}`,
    authority: `${process.env.AUTHORITY_URL}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
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
      scopes: ['user.read', 'user.readbasic.all', 'user.readwrite', 'user.read.all',
        'user.readwrite.all', 'directory.read.all', 'directory.accessasuser.all'],
      redirectUri: 'http://localhost:8080/login',
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
      scopes: ['user.read'],
      redirectUri: 'http://localhost:8080/login',
    };

    const token = await loggingSession.acquireTokenByCode(tokenRequest);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    placeTokenInCookie(token!, req, res);
    res.status(200).end();
  },
);
