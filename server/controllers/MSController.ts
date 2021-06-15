import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import MSOrganization from '../concepts/MSOrganization';

// eslint-disable-next-line import/prefer-default-export
export const getAzureADApplicationLogo = catchAsync(async (_req: Request, res: Response) => {
  const logo = await MSOrganization.getLogo();

  res.status(200).json({
    data: { logo },
  });
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await MSOrganization.getAllUsers(`Bearer ${req.cookies.jwt}`);

  res.status(200).json({
    data: { users },
  });
});

export const getUserPhoto = catchAsync(async (req: Request, res: Response) => {
  const photo = await MSOrganization.getUserPhoto(`Bearer ${req.cookies.jwt}`, req.params.id);
  res.status(200).json({
    data: { photo },
  });
});

export const getMyPhoto = catchAsync(async (req: Request, res: Response) => {
  const photo = await MSOrganization.getMyPhoto(`Bearer ${req.cookies.jwt}`);

  res.status(200).json({
    data: { photo },
  });
});
