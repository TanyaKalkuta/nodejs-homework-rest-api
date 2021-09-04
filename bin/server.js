/* eslint-disable spaced-comment */
const mongoose = require('mongoose');
require('dotenv').config();
//MqmRH6EGJzVqa9B
//-ZQbjfPPF5dB7BIfA-

const app = require('../app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running. Use our API on port: ${PORT}`,
      );
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
