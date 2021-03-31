import express from 'express';
import * as MSController from '../../controllers/MSController';

const organizationRouter = express.Router();

organizationRouter.get('/logo', MSController.getAzureADApplicationLogo);
organizationRouter.post('/users', MSController.getAllUsers);

export default organizationRouter;
