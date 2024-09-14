const express = require('express');
const router = express.Router();
const { getVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/vedioController');

// CRUD routes
router.get('/', getVideos);
router.post('/', createVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
