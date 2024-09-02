const uploadToImageBB = require('../utils/imageUpload');
const { ObjectId } = require('mongodb');

async function getClients(req, res) {
  try {
    const clientCollection = req.app.locals.clientCollection;
    const result = await clientCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: "Error fetching clients", error: error.message });
  }
}

async function addClient(req, res) {
  try {
    const clientCollection = req.app.locals.clientCollection;
    const { reviewText } = req.body;
    const file = req.file;

    let imageUrl = '';
    if (file) {
      imageUrl = await uploadToImageBB(file.buffer);
    }

    const newClient = { reviewText, imageUrl };

    const result = await clientCollection.insertOne(newClient);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ message: "Error adding client", error: error.message });
  }
}

async function deleteClient(req, res) {
  try {
    const clientCollection = req.app.locals.clientCollection;
    const { id } = req.params;
    const result = await clientCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Client deleted successfully' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: "Error deleting client", error: error.message });
  }
}

module.exports = { getClients, addClient, deleteClient };

