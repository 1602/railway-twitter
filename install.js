var config = [
    'development:',
    '  url: "http://1.lvh.me"',
    '  key: key',
    '  secret: secret',
    '  connectPath: "/twitter_connect"',
    '  callbackPath: "/twitter_callback"',
    'production:',
    '  url: "http://example.com"',
    '  key: key',
    '  secret: secret',
    '  connectPath: "/twitter_connect"',
    '  callbackPath: "/twitter_callback"'
].join('\n');

var observer = [
    'app.on(\'twitterConnect\', function (user, req, res) {',
    '    var location = req.session && req.session.beforeTwitterAuth || \'/\';',
    '    delete req.session.beforeTwitterAuth;',
    '    redirect(location);',
    '});'
].join('\n');

var fs = require('fs');
var path = require('path');

if (path.existsSync(app.root + '/config') && !path.existsSync(app.root + '/config/twitter.yml')) {
    fs.writeFileSync(app.root + '/config/twitter.yml', config);
    console.log('new file ./config/twitter.yml');
}

if (path.existsSync(app.root + '/observers') && !path.existsSync(app.root + '/observers/twitter_observer.js')) {
    fs.writeFileSync(app.root + '/observers/twitter_observer.js', observer);
    console.log('new file ./observers/twitter_observer.js');
}

process.exit(0);
