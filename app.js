const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import routes
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const usersRouter = require('./routes/users');
const browseRouter = require('./routes/browse');
const subscribeRouter = require('./routes/subscribe');
const listsRouter = require('./routes/lists');
const moviesRouter = require('./routes/movies');

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/Netflix")
  .then(() => console.log("Connected to Netflix database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public')); // static files

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/browse', browseRouter);
app.use('/subscribe', subscribeRouter);
app.use('/lists', listsRouter);
app.use('/lists', moviesRouter);

// 404 handler – returns JSON
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler – returns JSON
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
