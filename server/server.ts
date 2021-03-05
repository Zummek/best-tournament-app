require('dotenv').config();

import { connectDatabase } from './database/index';

// eslint-disable-next-line import/first
import app from './app';

const port = process.env.PORT || 3000;

connectDatabase();

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
