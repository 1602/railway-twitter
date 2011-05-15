Installation
------------

    mkdir node_modules
    git clone https://github.com/1602/railway-twitter.git node_modules/twitter
    echo "require('twitter');" >> npmfile.js
    touch config/twitter.yml

Configure `config/twitter.yml` with your twitter app credentials:

    development:
      url: "http://1.lvh.me"
      key: key
      secret: secret
    production:
      url: "http://example.com"
      key: key
      secret: secret
      connectPath: /twitter_connect
      callbackPath: /twitter_callback

Callback path: `/twitter_callback`

Usage
-----

In application add link to twitter connect `/twitter_connect`:

    <%- link_to("Connect to twitter", '/twitter_connect') %>

By default twitter connect path is `/twitter_connect`, but it can be configured in `config/twitter.yml`
Callback path can be configured too, see example below.

When app will connected with twitter, global `app` object will receive message `twitterConnect`
as event emitter, so you can:

    app.on('twitterConnect', function (user, req) {
       // find or create account for user
       // save user id in req.session
    });

It is fine put code like this into user model (`app/models/user.js`):

    app.on('twitterConnect', function (twitter, req) {
        User.findOne({twitterId: twitter.id}, function (err, user) {
            if (user) {
                req.session.user_id = user.id;
            } else {
                User.register({twitter: twitter});
            }
        });
    });
