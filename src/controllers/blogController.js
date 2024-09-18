// src/controllers/blogController.js
const { ObjectId } = require('mongodb');

exports.getAllBlogs = async (req, res) => {
  try {
    const client = req.app.locals.blogCollection.client;
    const db = client.db('blog');
    const blogs = await db.collection('blogs').find().toArray();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const client = req.app.locals.blogCollection.client;
    const db = client.db('blog');
    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(req.params.id) });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const client = req.app.locals.blogCollection.client;
    const db = client.db('blog');
    const newBlog = req.body;
    const result = await db.collection('blogs').insertOne(newBlog);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const client = req.app.locals.blogCollection.client;
    const db = client.db('blog');
    const updatedBlog = req.body;
    const result = await db.collection('blogs').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedBlog },
      { returnOriginal: false }
    );
    if (result.value) {
      res.json(result.value);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const client = req.app.locals.blogCollection.client;
    const db = client.db('blog');
    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'Blog deleted' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
