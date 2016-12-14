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
    '  callbackPath: "/twitter_callback"\n'
].join('\n');

var observer = [
    'app.on(\'twitterConnect\', function (user, req, res) {',
    '    var location = req.session && req.session.beforeTwitterAuth || \'/\';',
    '    delete req.session.beforeTwitterAuth;',
    '    res.redirect(location);',
    '});\n'
].join('\n');

var fs = require('fs');
var path = require('path');

if (fs.existsSync(app.root + '/config') && !fs.existsSync(app.root + '/config/twitter.yml')) {
    fs.writeFileSync(app.root + '/config/twitter.yml', config);
    console.log('new file ./config/twitter.yml');
}

if (fs.existsSync(app.root + '/app/observers') && !fs.existsSync(app.root + '/app/observers/twitter_observer.js')) {
    fs.writeFileSync(app.root + '/app/observers/twitter_observer.js', observer);
    console.log('new file ./app/observers/twitter_observer.js');
}

process.exit(0);

