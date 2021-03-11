import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as msal from "@azure/msal-node";
import writeResponse from "../utils/writeResponse";

const config = {
  auth: {
    clientId: `${process.env.CLIENT_ID}`,
    authority: `${process.env.AUTHORITY_URL}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
  },
  system: {
    loggerOptions: {
      loggerCallback(_loglevel: any, message: string, _containsPii: any) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const loggingSession = new msal.ConfidentialClientApplication(config);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri: "http://localhost:8080/",
    };

    const authSessionURL = await loggingSession.getAuthCodeUrl(
      authCodeUrlParameters
    );
    console.log(authSessionURL);
    writeResponse(res, {
      statusCode: 200,
      status: "success",
      data: authSessionURL,
    });
  }
);

export const getToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tokenRequest = {
      code: req.query.code as string,
      scopes: ["user.read"],
      redirectUri: "http://localhost:8080/",
    };

    loggingSession.acquireTokenByCode(tokenRequest).then((response: any) => {
      //[TO DO] adding cookies here
      writeResponse(res, {
        statusCode: 200,
        status: "success",
        data: response,
      });
    });
  }
);
