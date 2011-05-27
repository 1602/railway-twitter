Installation
------------

    railway install https://github.com/1602/railway-twitter.git

Usage
-----

In application add link to twitter connect `/twitter_connect`:

    <%- link_to("Connect to twitter", '/twitter_connect') %>

By default twitter connect path is `/twitter_connect`, but it can be configured in `config/twitter.yml`
Callback path can be configured too, see example below.

When app will connected with twitter, global `app` object will receive message `twitterConnect`
as event emitter, so you can:

    app.on('twitterConnect', function (user, req, res) {
       // find or create account for user
       // save user id in req.session
       // redirect user to a proper location
    });

Example of `app/observers/twitter_observer`:

    app.on('twitterConnect', function (twitter, req, res) {
        User.findOne({twitterId: twitter.id}, function (err, user) {
            if (user) {
                req.session.user_id = user.id;
            } else {
                User.register({twitter: twitter});
            }
        });
        res.redirect('/');
    });
