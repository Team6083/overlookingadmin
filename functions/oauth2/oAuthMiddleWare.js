const OauthServer = require('oauth2-server');
const model = require('./model');

const oauth = new OauthServer({ model });
const Request = OauthServer.Request;
const Response = OauthServer.Response;

const admin = require('firebase-admin');

/*
  TODO: Use this authenticateHandler to authenticate the user by other means
  https://github.com/oauthjs/node-oauth2-server/issues/314
  https://github.com/oauthjs/node-oauth2-server/issues/264
*/
const authenticateHandler = {
    handle(req, res) {

        return req.session.user;
    }
}

module.exports.token = (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);

    oauth.token(request, response)
        .then((token) => {
            console.log('generated token data', token);
            res.set(response.headers);
            res.json(response.body);
        }).catch(err => next(err));
};

module.exports.authorize = (req, res, next) => {
    console.log(req.method);
    if (req.method === "GET") {
        const authToken = req.query["auth_token"];
        res.render("authentication.ejs", {
            authToken: authToken,
            // projectId: process.env.GCLOUD_PROJECT,
            projectId: "overlooking-admin",
            // projectApiKey: Configuration.instance.project_apikey,
            projectApiKey: "AIzaSyDqGsMpbk3UFSDgJdBTp6hx1jGtZMFAvjg"
        })
        return
    }

    const request = new Request(req);
    const response = new Response(res);
    const options = {
        authenticateHandler
    }

    oauth.authorize(request, response, options).then((authorizationCode) => {
        // TODO: Here i get a redirect response
        console.log(authorizationCode);
        res.status(response.status).set(response.headers).end();
    }).catch(err => next(err));
};

module.exports.authenticate = (req, res, next) => {
    const request = new Request(req);
    const response = new Response(res);

    oauth.authenticate(request, response)
        .then((token) => {
            console.log('token data', token)
            // Request is authorized.
            Object.assign(req, { user: token });
            next();
        })
        .catch(err => next(err));
};
