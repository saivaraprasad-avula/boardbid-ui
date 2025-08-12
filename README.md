# boardbid-ui

Static site for BoardBid.

## Development

Clerk is loaded conditionally in `login.html` so the app works in both development and production. When running on `localhost` the Clerk JS library loads from the public CDN; otherwise the production custom domain `clerk.boardbid.ai` is used.