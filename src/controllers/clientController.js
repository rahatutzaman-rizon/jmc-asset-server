

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

module.exports = { getClients };
