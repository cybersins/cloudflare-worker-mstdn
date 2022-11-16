# cloudflare-worker-mstdn
Cloudflare Worker to fetch Account Information & use it for ALIAS.

# Why this?
Alright, so I have thought multiple times to run my own instance just so I can have a custom-domain, and data within my server (many a times have lost data while moving social networks)
While the second reason is still working in progress, but for the first one I thought my not use my email address as an alias for Mastodon?!

## Technical Details - Webfinger Protocol

Request: [Details](https://www.rfc-editor.org/rfc/rfc7033#section-3.1)
> GET /.well-known/webfinger? resource=acct%3Acarol%40example.com&rel=http%3A%2F%2Fopenid.net%2Fspecs%2Fconnect%2F1.0%2Fissuer HTTP/1.1

Response: [Details](https://www.rfc-editor.org/rfc/rfc7033#section-3.2)
> {
>       "subject" : "http://blog.example.com/article/id/314", \
>       "aliases" :\
>       [\
>         "http://blog.example.com/cool_new_thing",\
>         "http://blog.example.com/steve/article/7"\
> <..snipped..>

## Cloudflare Workers (more details: https://blog.cloudflare.com/introducing-cloudflare-workers/)
