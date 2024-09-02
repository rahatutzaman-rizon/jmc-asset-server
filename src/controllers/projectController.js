const { ObjectId } = require('mongodb');
const uploadToImageBB = require('../utils/imageUpload');

async function getProjects(req, res) {
  try {
    const projectCollection = req.app.locals.projectCollection;
    const result = await projectCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
}

async function getProjectById(req, res) {
  try {
    const id = req.params.id;
    const projectCollection = req.app.locals.projectCollection;
    const result = await projectCollection.findOne({ _id: new ObjectId(id) });
    if (!result) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.send(result);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
}

async function createProject(req, res) {
  try {
    const { status } = req.body;
    const projectCollection = req.app.locals.projectCollection;
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
}

async function updateProject(req, res) {
  try {
    const id = req.params.id;
    const projectCollection = req.app.locals.projectCollection;
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
}



//delete 
async function deleteImageFromProject(req, res) {
  try {
    const { id } = req.params; // Project ID
    const { image } = req.params; // Dynamic image URL to delete
    const projectCollection = req.app.locals.projectCollection;

    // Find the project by ID
    const project = await projectCollection.findOne({ _id: new ObjectId(id) });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if the image exists in the images array
    if (!project.images.includes(image)) {
      return res.status(404).json({ message: "Image not found in project" });
    }

    // Remove the specific image from the images array
    const updatedImages = project.images.filter(url => url !== image);

    // Update the project document with the new images array
    const result = await projectCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { images: updatedImages } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "Failed to delete image from project" });
    }

    res.status(200).json({
      message: "Image deleted successfully",
      _id: id,
      remainingImages: updatedImages.length
    });
  } catch (error) {
    console.error("Error deleting image from project:", error);
    res.status(500).json({ message: "Error deleting image from project", error: error.message });
  }
}


module.exports = { getProjects, getProjectById, createProject, updateProject,deleteImageFromProject };
