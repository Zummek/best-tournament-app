import dotenv from 'dotenv'
dotenv.config();

import app from './app';
import { connectDatabase } from './database';

const port = process.env.PORT || 3000;
connectDatabase();  

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
