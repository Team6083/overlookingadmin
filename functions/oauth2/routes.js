const oauthMiddlewares = require('./oAuthMiddleWare');
const { createClient } = require('./controllers');

function initialize(app) {
  app.all('/oauth/token', oauthMiddlewares.token);

  app.get('/oauth/authorize', oauthMiddlewares.authorize);
  app.post('/oauth/authorize', oauthMiddlewares.authorize);

  app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: 'Secure data' });
  });

  app.post('/client', createClient);
}

module.exports = initialize;