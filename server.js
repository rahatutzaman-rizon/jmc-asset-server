const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/database');
const clientRoutes = require('./src/routes/clientRoutes');
const projectRoutes = require('./src/routes/projectRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use('/client', clientRoutes);
app.use('/projects', projectRoutes);

app.get("/", (req, res) => {
  res.send("JMC technology Asset Management");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
