var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
    clientId: '4440e2184df523838e855091a7a37825',
    clientSecret: 'c054e565a0e5691674583fea5938c402ade3af3431b4b274ee7f6965895cb242',
    accessTokenUri: 'http://localhost:5000/overlooking-admin/us-central1/oAuth/oauth/token',
    authorizationUri: 'http://localhost:5000/overlooking-admin/us-central1/oAuth/oauth/authorize',
    redirectUri: 'http://localhost:5000/overlooking-admin/us-central1/oAuth/callback',
    scopes: ['profile']
})

console.log(githubAuth.code.getUri());
githubAuth.code.getToken("http://localhost:5000/overlooking-admin/us-central1/oAuth/callback?code=2f7bf8984fe96390c67d36372e37f00a06ceb141&state=123")
    .then((token) => {
        console.log(token);
        setTimeout(() => {
            token.refresh().then((ref_token) => {
                console.log('ref token', ref_token);
            }).catch((err) => {
                console.log(err);
            });
        }, 5000);
    })
    .catch((err) => {
        console.log(err);
    })

githubAuth.createToken()