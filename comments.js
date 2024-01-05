// Create web server
// Load the 'express' module
const express = require('express');
// Create a new instance of express
const app = express();
// Load the 'hbs' module
const hbs = require('hbs');
// Load the 'body-parser' module
const bodyParser = require('body-parser');
// Load the 'cookie-parser' module
const cookieParser = require('cookie-parser');
// Load the 'express-session' module
const session = require('express-session');
// Load the 'connect-flash' module
const flash = require('connect-flash');
// Load the 'mongoose' module
const mongoose = require('mongoose');
// Load the 'passport' module
const passport = require('passport');

// Load the 'index' controller
const index = require('./app/routes/index.server.routes');
// Load the 'users' controller
const users = require('./app/routes/users.server.routes');
// Load the 'comments' controller
const comments = require('./app/routes/comments.server.routes');
// Load the 'passport' configuration file
require('./config/passport')(passport);

// Set the port number
const port = 3000;

// Parse the request body as JSON
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set the cookie parser middleware
app.use(cookieParser());

// Set the session middleware
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'OurSuperSecretCookieSecret'
}));

// Set the flash middleware
app.use(flash());

// Set the view engine
app.set('view engine', 'hbs');

// Set the folder for storing views
app.set('views', __dirname + '/app/views');

// Register the 'index' controller
app.use('/', index);
// Register the 'users' controller
app.use('/users', users);
// Register the 'comments' controller
app.use('/comments', comments);

// Configure static file serving
app.use(express.static('public'));

// Configure the Mongoose module
const dbURI = 'mongodb://localhost/comp308-w2017';
mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

// Start listening on port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});