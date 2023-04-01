[Docs in progress! Most of this is not live.]

### Indexer

The indexer includes two cron jobs:
- Job `indexUsers` refreshes the user list for the client. Runs once a day by default.
- Job `indexCasts` refreshes cast data for the client. Runs once per minute by default.

Both indexer routes run on Vercel's Cron Job functionality.

### API

The API is how the default client accesses the Farcaster Protocol. It uses Warpcast's API to start, but I'll update it to use hubs soon. If you want to build your own client from scratch, you can just use the API.

To-do:
- decide on a schema for users. Should we just mimic Merkle's? Prisma only allows for flat objects on a table—how should we get around this?
