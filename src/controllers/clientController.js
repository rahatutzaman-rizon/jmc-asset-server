const { client } = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getClients = async (req, res) => {
  try {
    const clientCollection = client.db("client").collection("person");
    const clients = await clientCollection.find().toArray();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getClients };
