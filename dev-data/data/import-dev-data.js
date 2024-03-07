const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const path = require('path');
const Tour = require('./../../models/tourModel');
// Read all variables from the  file and save them into nodejs env variable
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo Atlas is up and running!!');
  });

// RREAD JSON FILE
const tours = JSON.parse(fs.readFileSync('dev-data/data/import-dev-data.js', 'utf-8'));

// IMPORT FUNCTION
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data seccessfully loaded!!');
  } catch (err) {
    console.log(err);
  }
};

// DELET FUNCTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data seccessfully deleted!!');
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);
