require('dotenv').config()



// eslint-disable-next-line import/first
import app from "./app";

const port = process.env.PORT || 3000;

// eslint-disable-next-line no-unused-vars
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
