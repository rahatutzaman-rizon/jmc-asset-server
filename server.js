const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { connectToDB } = require('./src/config/database');
const projectRoutes = require('./src/routes/projectRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.use('/projects', upload.array('images', 5), projectRoutes);

app.get("/", (req, res) => {
  res.send("Job Task Planner server is running");
});


app.use('/', clientRoutes);

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
