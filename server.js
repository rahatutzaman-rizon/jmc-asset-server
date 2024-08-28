const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/database');

const projectRoutes = require('./src/routes/projectRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/', projectRoutes);
app.use('/', clientRoutes);

app.get("/", (req, res) => {
  res.send("Job Task Planner server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
