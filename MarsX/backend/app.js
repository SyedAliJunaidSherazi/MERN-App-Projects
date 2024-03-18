const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConnect = require("./config/database");
const port = require("./config/ports");
const ingestRoute = require('./routes/ingest-route');
const authRoute = require('./routes/auth-route'); 
const HttpError = require('./models/http-error');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

//   next();
// });

app.use(bodyParser.json());

// Injest Route
app.use('/api', ingestRoute);

// Authentication route
app.use('/api/auth', authRoute); 

// Route for chcking invalid route 
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});


// Route for checking errors while getting request

app.use((error, req, res, next) => {
  console.error(error);

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});


// Starting Server
mongoose
  .connect(
    dbConnect.mongodbUri
  )
  .then(() => {
    console.log('Connected');
    app.listen(port.BackendPortNo);
  })
  .catch(err => {
    console.log(err);
  });
