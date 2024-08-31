const express = require('express');
const { getProjects, getProjectById, createProject, updateProject } = require('../controllers/projectController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', upload.array('images', 5), createProject);
router.put('/:id', upload.array('images', 5), updateProject);

module.exports = router;
