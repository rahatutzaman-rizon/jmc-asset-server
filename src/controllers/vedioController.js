const { ObjectId } = require('mongodb');

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const db = req.app.locals.vedioCollection;
    const videos = await db.find().toArray();  // Changed to `find().toArray()` to fetch all documents
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const db = req.app.locals.vedioCollection;
    await db.insertOne({ title, description, link });
    res.status(201).json({ message: 'Video created' });
  } catch (error) {
    console.error('Error creating video:', error);
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const db = req.app.locals.vedioCollection;
    const result = await db.updateOne({ _id: new ObjectId(id) }, { $set: { title, description, link } });

    if (result.modifiedCount === 1) {
      res.json({ message: 'Video updated' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Error updating video', error: error.message });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.app.locals.vedioCollection;
    const result = await db.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.json({ message: 'Video deleted' });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};
