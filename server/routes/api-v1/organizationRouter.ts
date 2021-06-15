import express from 'express';
import * as MSController from '../../controllers/MSController';

const organizationRouter = express.Router();

organizationRouter.get('/logo', MSController.getAzureADApplicationLogo);
organizationRouter.get('/users', MSController.getAllUsers);
organizationRouter.get('/users/:id/photo', MSController.getUserPhoto);
organizationRouter.get('/users/photo', MSController.getMyPhoto);

export default organizationRouter;
