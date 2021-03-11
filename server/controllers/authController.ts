import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as msal from "@azure/msal-node";

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
    try {
      const response = await loggingSession.getAuthCodeUrl(
        authCodeUrlParameters
      );
      console.log(response);
      res.status(200).json({
        status: "success",
        session: response,
      });
    } catch (err) {
      console.log(JSON.stringify(err));
      res.status(500).json({
        status: "failed",
        message: "Logging error",
      });
    }
  }
);

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenRequest = {
    code: req.query.code as string,
    scopes: ["user.read"],
    redirectUri: "http://localhost:8080/",
  };

  loggingSession
    .acquireTokenByCode(tokenRequest)
    .then((response: any) => {
      console.log("\nResponse: \n:", response);
      // res.cookie('jwt', cookieOptions);
      res.status(200).json({
        status: "success",
        token: response,
      });
    })
    .catch((error: Error) => {
      console.log(error);
      res.status(500).send(error);
    });
};
