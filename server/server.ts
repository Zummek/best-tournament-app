/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import colors from 'colors';
import { connectDatabase } from './database';
import app from './app';
import logger from './utils/logger';

const port = process.env.PORT || '3000';
connectDatabase();

app.listen(port, () => {
  logger.info(`Server is listening on port ${colors.yellow(port)}`);
});
