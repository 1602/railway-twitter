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

MIT License
===========

    Copyright (C) 2011 by Anatoliy Chakkaev
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

