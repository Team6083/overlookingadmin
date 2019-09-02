const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes');

const app = express();

app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

authRoutes(app);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;