const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);

app.get("/", (req, res) => {
  res.send("Job Task Planner server");
});

module.exports = app;