const { ObjectId } = require('mongodb');

// Create a new banner
const createBanner = async (req, res) => {
  try {
    const bannerCollection = req.app.locals.bannerCollection;
    const newBanner = req.body;

    // Optional: Add validation for newBanner if needed

    const result = await bannerCollection.insertOne(newBanner);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ error: 'Failed to create banner', details: error.message });
  }
};

// Get all banners
const getBanners = async (req, res) => {
  try {
    const bannerCollection = req.app.locals.bannerCollection;
    const banners = await bannerCollection.find().toArray();
    res.status(200).json(banners);
  } catch (error) {
    console.error('Error retrieving banners:', error);
    res.status(500).json({ error: 'Failed to retrieve banners', details: error.message });
  }
};

// Get a single banner by ID
const getBannerById = async (req, res) => {
  try {
    const bannerCollection = req.app.locals.bannerCollection;
    const { id } = req.params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid banner ID format' });
    }

    const banner = await bannerCollection.findOne({ _id: new ObjectId(id) });
    if (banner) {
      res.status(200).json(banner);
    } else {
      res.status(404).json({ error: 'Banner not found' });
    }
  } catch (error) {
    console.error('Error retrieving banner:', error);
    res.status(500).json({ error: 'Failed to retrieve banner', details: error.message });
  }
};

// Update a banner by ID
const updateBanner = async (req, res) => {
  try {
    const bannerCollection = req.app.locals.bannerCollection;
    const { id } = req.params;
    const updatedBanner = req.body;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid banner ID format' });
    }

    const result = await bannerCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBanner }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Banner updated successfully' });
    } else {
      res.status(404).json({ error: 'Banner not found' });
    }
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ error: 'Failed to update banner', details: error.message });
  }
};

// Delete a banner by ID
const deleteBanner = async (req, res) => {
  try {
    const bannerCollection = req.app.locals.bannerCollection;
    const { id } = req.params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid banner ID format' });
    }

    const result = await bannerCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Banner deleted successfully' });
    } else {
      res.status(404).json({ error: 'Banner not found' });
    }
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ error: 'Failed to delete banner', details: error.message });
  }
};

module.exports = {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
};
