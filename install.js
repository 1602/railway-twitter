var config = [
    'development:',
    '  url: "http://1.lvh.me"',
    '  key: key',
    '  secret: secret',
    '  connectPath: /twitter_connect',
    '  callbackPath: /twitter_callback',
    'production:',
    '  url: "http://example.com"',
    '  key: key',
    '  secret: secret',
    '  connectPath: /twitter_connect',
    '  callbackPath: /twitter_callback'
].join('\n');

var fs = require('fs');
var path = require('path');

if (path.existsSync(app.root + '/config') && !path.existsSync(app.root + '/config/twitter.yml')) {
    fs.writeFileSync(app.root + '/config/twitter.yml', config);
}

process.exit(0);
