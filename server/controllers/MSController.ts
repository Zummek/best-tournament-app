import axios from 'axios';
import QueryString from 'qs';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

// eslint-disable-next-line import/prefer-default-export
export const getAzureADApplicationLogo = catchAsync(async (req: Request, res: Response) => {
  const applicationToken = await axios({
    method: 'POST',
    url: `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
    data: QueryString.stringify({
      client_id: `${process.env.CLIENT_ID}`,
      scope: 'https://graph.microsoft.com/.default',
      client_secret: `${process.env.CLIENT_SECRET}`,
      grant_type: 'client_credentials',
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  const applicationData = await axios({
    method: 'GET',
    url: `https://graph.microsoft.com/v1.0/applications/${process.env.OBJECT_ID}`,
    headers: {
      Authorization: `Bearer ${applicationToken.data.access_token}`,
    },
  });
  res.status(200).json({
    logo: applicationData.data.info.logoUrl,
  });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await axios({
    method: 'GET',
    url: 'https://graph.microsoft.com/beta/users',
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`,
    },
  });
  res.status(200).json({
    users: users.data.value,
  });
});

export const getUserPhoto = catchAsync(async (req: Request, res: Response) => {
  const photo = await axios({
    method: 'GET',
    url: `https://graph.microsoft.com/beta/users/${req.params.id}/photo/$value`,
    headers: {
      Authorization: `Bearer ${req.cookies.jwt}`,
    },
  });
  res.status(200).json({
    // binary representation
    photo: photo.data,
  });
});
