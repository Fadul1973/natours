const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Unhandled exception
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting Down....');
  console.log(err.name, err.message);
  process.exit(1);
});

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
const server = app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// Unhandled rejection error handling
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION Shutting Down....');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
