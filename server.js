const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const bannerRoutes=require('./src/routes/bannerRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
const port = process.env.PORT || 5000;


///middleware
app.use(express.json());
app.use(cors());

async function initialize() {
  try {
    const client = await connectDB();

    const projectCollection = client.db("projects").collection("project");
    const clientCollection = client.db("client").collection("person");
    const bannerCollection=client.db("banner").collection("data");

    app.locals.projectCollection = projectCollection;
    app.locals.clientCollection = clientCollection;
    app.locals.bannerCollection = bannerCollection;


// routes declare

    app.use('/projects', projectRoutes);
    app.use('/client', clientRoutes);
    app.use("/banner",bannerRoutes);

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
