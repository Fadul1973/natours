const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Middleware to modify any request comming into the server
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const getAllTours = require('./routes/tourRoutes');
const getTour = require('./routes/tourRoutes');
const createTours = require('./routes/tourRoutes');
const updateTours = require('./routes/tourRoutes');
const deleteTours = require('./routes/tourRoutes');

const getAllUsers = require('./routes/userRoutes');
const getUser = require('./routes/userRoutes');
const createUsers = require('./routes/userRoutes');

// ROUTE MIDDLEWARE
app.use('/api/v1/tours', getAllTours);
app.use('/api/v1/tours/:id', getTour);
app.use('/api/v1/tours', createTours);
app.use('/api/v1/tours', updateTours);
app.use('/api/v1/tours', deleteTours);

app.use('/api/v1/users', getAllUsers);
app.use('/api/v1/users/:id', getUser);
app.use('/api/v1/users', createUsers);

// To handle request that dosen't have routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Fial',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});
module.exports = app;
