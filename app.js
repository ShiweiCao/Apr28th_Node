const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const machinesRoutes = require('./api/routes/machines');
const messagesRoutes = require('./api/routes/messages');
const usersRoutes = require('./api/routes/users');

mongoose.connect(
  'mongodb://admin:admin' +
  '@cluster0-shard-00-00-jv428.mongodb.net:27017,cluster0-shard-00-01-jv428.mongodb.net:27017,cluster0-shard-00-02-jv428.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
);

console.log('db concnect');

// logger
app.use(morgan('dev'));

// request payload body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static resource
// app.use('/uploads', express.static('uploads'));

// prevent CORS errors
// tell client that it can access
// browsers send options first before any get or post
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // origin eg. http://34.21.213.10
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/machines', machinesRoutes);
app.use('/messages', messagesRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  });
});

module.exports = app;
