const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://rizonrahat199:AheXI006z6v9OQzl@cluster0.yuht9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const IMGBB_API_KEY = 'a6d456d255d1ba19fb79c3ba85d9871d';

const upload = multer({ storage: multer.memoryStorage() });

async function uploadToImageBB(imageBuffer) {
  const form = new FormData();
  form.append('image', imageBuffer.toString('base64'));

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, form, {
      headers: form.getHeaders()
    });
    return response.data.data.url;
  } catch (error) {
    console.error('Error uploading to ImageBB:', error);
    throw new Error('Failed to upload image');
  }
}

async function run() {
  try {
     await client.connect();
    console.log("Connected to MongoDB");

    const projectCollection = client.db("projects").collection("project");
    const clientCollection=client.db("client").collection("person");
    // GET all projects
    app.get("/projects", async (req, res) => {
      try {
        const result = await projectCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: "Error fetching projects", error: error.message });
      }
    });



    app.get("/client", async (req, res) => {
      try {
        const result = await clientCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: "Error fetching projects", error: error.message });
      }
    });

    // GET a single project by ID
    app.get("/projects/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await projectCollection.findOne(query);
        if (!result) {
          return res.status(404).json({ message: "Project not found" });
        }
        res.send(result);
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: "Error fetching project", error: error.message });
      }
    });

    // POST a new project
    app.post("/projects", upload.array('images', 5), async (req, res) => {
      try {
        const { status } = req.body;
        const uploadPromises = req.files.map(file => uploadToImageBB(file.buffer));
        const imageUrls = await Promise.all(uploadPromises);

        const result = await projectCollection.insertOne({
          images: imageUrls,
          status,
        });

        res.status(201).json({ 
          message: "New project created", 
          _id: result.insertedId, 
          images: imageUrls, 
          status 
        });
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(400).json({ message: "Error creating project", error: error.message });
      }
    });

    // PUT (update) a project with new images
    app.put("/projects/:id", upload.array('images', 5), async (req, res) => {
      try {
        const id = req.params.id;
        const project = await projectCollection.findOne({ _id: new ObjectId(id) });
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }

        const uploadPromises = req.files.map(file => uploadToImageBB(file.buffer));
        const newImageUrls = await Promise.all(uploadPromises);

        const updatedImages = [...project.images, ...newImageUrls];

        const result = await projectCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { images: updatedImages } }
        );

        if (result.modifiedCount === 0) {
          return res.status(400).json({ message: "Failed to update project" });
        }

        res.status(200).json({ 
          message: "Project updated successfully", 
          _id: id, 
          addedImages: newImageUrls,
          totalImages: updatedImages.length
        });
      } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project", error: error.message });
      }
    });

    // You can add more routes here as needed, such as DELETE a project, etc.

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job Task Planner server is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});