const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rizonrahat199:AheXI006z6v9OQzl@cluster0.yuht9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

module.exports = { client, connectDB };
