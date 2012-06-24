var util = require('util');

action('connect', function () {
    req.session.beforeTwitterAuth = req.headers.referer;
    delete req.session.twitter;
    consumer().getOAuthRequestToken(gotToken);

    function gotToken (error, oauthToken, oauthTokenSecret, results) {
        if (error) {
            flash(error, "Error getting OAuth request token : " + util.inspect(error));
            redirectBack();
        } else {
            req.session.twitter = {
                oauthRequestToken: oauthToken,
                oauthRequestTokenSecret: oauthTokenSecret
            };
            redirect(_apiSecureHost + "/oauth/authorize?oauth_token=" + oauthToken);
        }
    }
});

action('callback', function () {
    consumer().getOAuthAccessToken(
        req.session.twitter.oauthRequestToken,
        req.session.twitter.oauthRequestTokenSecret,
        req.query.oauth_verifier,
        twitterCallback.bind(this)
    );

    function twitterCallback (error, oauthAccessToken, oauthAccessTokenSecret, results) {
        if (error) {
            send("Error getting OAuth access token : " + util.inspect(error), 500);
            return;
        }
        consumer().get(
            _apiHost + "/account/verify_credentials.json",
            oauthAccessToken,
            oauthAccessTokenSecret,
            gotData);

        function gotData (error, data, response) {
            if (error) {
                flash(error, "Error getting twitter screen name : " + util.inspect(error));
                redirectBack();
                console.log('gotData:', error);
            } else {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                req.session.twitter = data;
                req.session.twitter.oauthAccessToken = oauthAccessToken;
                req.session.twitter.oauthAccessTokenSecret = oauthAccessTokenSecret;
                app.emit(TWITTER_CONNECT_EVENT, req.session.twitter, req, res);
            }
        }
    }
});

function redirectBack (f) {
    var location = req.session && req.session.beforeTwitterAuth || '/';
    delete req.session.beforeTwitterAuth;
    redirect(location);
}

