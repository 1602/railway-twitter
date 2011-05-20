var oauth = require('oauth');
var sys = require('sys');

var _twitterConsumerKey;
var _twitterConsumerSecret;
var _host;
var _apiHost = 'http://twitter.com';
var _apiSecureHost = 'https://twitter.com';
var _callbackPath = '/twitter_callback';
var _connectPath = '/twitter_connect';



function consumer () {
    return new oauth.OAuth(
        _apiHost + "/oauth/request_token", _apiSecureHost + "/oauth/access_token",
        _twitterConsumerKey, _twitterConsumerSecret, "1.0A", _host + _callbackPath, "HMAC-SHA1");
}

exports.init = function initTwitterConnect () {
    try {
        var settings = require('yaml').eval(require('fs').readFileSync(app.root + '/config/twitter.yml').toString('utf8'))[app.settings.env];
    } catch (e) {
        console.log('Could not init twitter extension, env-specific settings not found in config/twitter.yml');
        console.log('Error:', e.message);
    }
    if (settings) {
        _twitterConsumerKey = settings.key;
        _twitterConsumerSecret = settings.secret;
        _host = settings.url;

        if (settings.callbackPath) {
            _callbackPath = callbackPath;
        }

        if (settings.connectPath) {
            _connectPath = connectPath;
        }
    }
    railway.controller.addBasePath(__dirname + '/app/controllers', '', {
        TWITTER_CONNECT_EVENT: 'twitterConnect',
        _apiSecureHost: _apiSecureHost,
        _apiHost: _apiHost,
        consumer: consumer
    });
    railway.routeMapper.get(_callbackPath, 'twitter_connect#callback');
    railway.routeMapper.get(_connectPath,  'twitter_connect#connect');
};

exports.consumer = consumer;

function routes (map) {
}


