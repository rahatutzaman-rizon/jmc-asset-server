// src/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes'); // Import auth routes
const bannerRoutes = require('./src/routes/bannerRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

async function initialize() {
  try {
    const client = await connectDB();

    const projectCollection = client.db("projects").collection("project");
    const clientCollection = client.db("client").collection("person");
    const bannerCollection = client.db("banner").collection("data");
    const userCollection = client.db("users").collection("users"); // Add user collection

    app.locals.projectCollection = projectCollection;
    app.locals.clientCollection = clientCollection;
    app.locals.bannerCollection = bannerCollection;
    app.locals.userCollection = userCollection; // Add user collection to locals

    // Routes declaration
    app.use('/projects', projectRoutes);
    app.use('/client', clientRoutes);
    app.use('/banner', bannerRoutes);
    app.use('/auth', authRoutes); // Add authentication routes

    app.get("/", (req, res) => {
      res.send("Job Task Planner server is running");
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.error("Failed to initialize server:", error);
  }
}

initialize();
