import { Request, Response } from 'express';
import * as msal from '@azure/msal-node';
import catchAsync from '../utils/catchAsync';

const config = {
  auth: {
    clientId: `${process.env.CLIENT_ID}`,
    authority: `${process.env.AUTHORITY_URL}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
  },
  system: {
    loggerOptions: {
      loggerCallback(_loglevel: unknown, message: string) {
        // eslint-disable-next-line no-console
        console.log(message);
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
      scopes: ['user.read'],
      redirectUri: 'http://localhost:8080/',
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
      code: req.query.code as string,
      scopes: ['user.read'],
      redirectUri: 'http://localhost:8080/',
    };

    loggingSession.acquireTokenByCode(tokenRequest).then((response: unknown) => {
      // [TO DO] adding cookies here
      res.status(200).json({
        data: response,
      });
    });
  },
);
