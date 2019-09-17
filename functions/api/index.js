const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const admin = require('firebase-admin');

const app = express();

app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const auth = require('./auth');
const permissionTable = auth.permissionTable;

app.use(function (req, res, next) {
    if (permissionTable[req.url]) {
        const idToken = req.headers.authorization;
        if (!idToken) {
            const err = new Error("not_authed");
            err.status = 401;
            next();
            return;
        }
        admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
            return admin.auth().getUser(decodedIdToken.uid);
        }).then((user) => {
            if (user.customClaims.hasOwnProperty("role")) {
                if (permissionTable[req.url].includes(user.customClaims.role)) {
                    next();
                    return;
                } else {
                    const err = new Error("no_permission");
                    err.status = 403;
                    next(err);
                    return;
                }
            } else {
                const err = new Error("invalid_auth");
                err.status = 403;
                next(err);
                return;
            }
        }).catch((err) => {
            next(err);
            return;
        });
    }

    next();
});

const userFunctions = require('./user');
userFunctions(app);

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