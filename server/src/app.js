const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const tokensRouter = require('./routes/tokens.router');
const authRouter = require('./routes/auth.router');
const genresRouter = require('./routes/genres.router');
const songsRouter = require('./routes/songs.router');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/songs', songsRouter);
app.use('/api/genres', genresRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);

module.exports = app;
