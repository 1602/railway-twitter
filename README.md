Installation
------------

    mkdir node_modules
    git clone https://1602@github.com/1602/raiway-twitter.git node_modules/twitter
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

Callback path: `/twitter_callback`

Usage
-----

In application add link to twitter connect `/twitter_connect`:

    <%- link_to("Connect to twitter", '/twitter_connect') %>
