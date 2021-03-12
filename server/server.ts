import dotenv from 'dotenv';
import { connectDatabase } from './database';

dotenv.config();

// eslint-disable-next-line import/first
import app from './app';

const port = process.env.PORT || 3000;
connectDatabase();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
