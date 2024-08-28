const { ObjectId } = require('mongodb');
const { getCollection } = require('../config/database');

const projectCollection = getCollection('projects', 'project');
const projectCollection2 = getCollection('project2', 'project');

const getProjects = async (req, res) => {
  const result = await projectCollection.find().toArray();
  res.send(result);
};

const getProjectById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await projectCollection.findOne(query);
  res.send(result);
};

const getProjects2 = async (req, res) => {
  const result = await projectCollection2.find().toArray();
  res.send(result);
};

module.exports = { getProjects, getProjectById, getProjects2 };
