import dotenv from 'dotenv';

import app from './app';
import { connectDatabase } from './database';

dotenv.config();

const port = process.env.PORT || 3000;
connectDatabase();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
