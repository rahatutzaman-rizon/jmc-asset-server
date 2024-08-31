



const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rizonrahat199:AheXI006z6v9OQzl@cluster0.yuht9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;

async function connectToDB() {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  return client.db('projects');
}

module.exports = { connectToDB, getDb };
