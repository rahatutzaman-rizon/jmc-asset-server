const express = require('express');
const { getProjects, getProjects2 } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getProjects);
router.get('/projects2', getProjects2);

module.exports = router;
