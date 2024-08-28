const express = require('express');
const { getProjects, getProjectById, getProjects2 } = require('../controllers/projectController');
const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);
router.get('/projects2', getProjects2);

module.exports = router;
