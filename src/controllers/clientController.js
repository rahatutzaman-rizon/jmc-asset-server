const { getCollection } = require('../config/database');

const clientCollection = getCollection('client', 'person');

const getClients = async (req, res) => {
  const result = await clientCollection.find().toArray();
  res.send(result);
};

module.exports = { getClients };
