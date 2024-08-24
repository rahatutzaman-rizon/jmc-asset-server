const { client } = require('../config/database');
const ObjectId = require('mongodb').ObjectId;

const getProjects = async (req, res) => {
  try {
    const projectCollection = client.db("projects").collection("project");
    const projects = await projectCollection.find().toArray();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjects2 = async (req, res) => {
  try {
    const projectCollection2 = client.db("project2").collection("project");
    const projects = await projectCollection2.find().toArray();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProjects, getProjects2 };
