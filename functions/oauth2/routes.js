const oauthMiddlewares = require('./oAuthMiddleWare');


function initialize(app) {
  app.all('/oauth/token', oauthMiddlewares.token);

  app.get('/oauth/authorize', oauthMiddlewares.authorize);
  app.post('/oauth/authorize', oauthMiddlewares.authorize);

  app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: 'Secure data' });
  });
}

module.exports = initialize;