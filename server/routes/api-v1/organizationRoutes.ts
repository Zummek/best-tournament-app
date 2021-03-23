import express from 'express';
import * as authController from '../../controllers/authController';

const organizationRouter = express.Router();

organizationRouter.get('/logo', authController.getAzureADApplicationLogo);

export default organizationRouter;
