const express = require('express');
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const passport=require('passport');
// const Localstrategy= require(passport-local).Strategy
const cors = require('cors')
// configure the app
const app = express()

// CONFIGURING THE CORS
// const corsOptions = {
  
//   origin: 'http://192.168.0.103:8081', // Replace with the actual URL of your React Native app
//   methods: 'GET,POST,PUT, DELETE,PATCH ', // Define the HTTP methods you want to allow
//   optionsSuccessStatus: 200, // Some legacy browsers choke on 204
// };

// routes imports
const authRoutes = require("./routs/authRout");
const userRoutes = require('./routs/userRout')

// middlewares
// app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use( bodyParser.json());
app.use(cors());
app.use(passport.initialize())

// connecting to specific routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// connect the app to database


const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listening to port
    app.listen(port, () => {
      console.log(`connected to db and listening on port ${port} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
