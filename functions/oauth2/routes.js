const oauthMiddlewares = require('./oAuthMiddleWare');
const { createClient } = require('./controllers');
const admin = require('firebase-admin');
const { getAuthorizationCode, getUserByID } = require('./model');

function initialize(app) {
  app.all('/oauth/token', oauthMiddlewares.token);

  app.get('/oauth/authorize', oauthMiddlewares.authorize);
  app.post('/oauth/authorize', oauthMiddlewares.authorize);

  app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: 'Secure data' });
  });

  app.get('/getUserIdToken', oauthMiddlewares.authenticate, (req, res) => {
    if (req.user) {
      getUserByID(req.user.user).then((user) => {
        admin.auth().createCustomToken(user._id, { test: true }).then((customToken) => {
          res.json(customToken);
        })
      })
    }
  });

  app.post('/client', createClient);
}

module.exports = initialize;