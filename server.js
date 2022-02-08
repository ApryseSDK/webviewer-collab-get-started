require('dotenv').config();

const CollabServer = require('@pdftron/collab-server');
const CollabDatabase = require('@pdftron/collab-db-postgresql');

const db = new CollabDatabase({
  host: '127.0.0.1',
  port: 5432,
  dbName: 'collab', // This is the dbName we set in the previous step
  username: 'postgres',
  password: 'pdftron' // This is the db password we set in the previous step
});

(async () => {
  await db.connectDB();

  const server = new CollabServer({
    resolvers: db.getResolvers(),

    // Allow requests from all domains
    corsOption: {
      origin: true
    }
  })

  server.start(3000);
})()