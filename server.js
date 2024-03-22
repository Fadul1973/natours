const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Read all variables from the  file and save them into nodejs env variable
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  // .connect(DB, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo Atlas is up and running!!');
  });

// SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
