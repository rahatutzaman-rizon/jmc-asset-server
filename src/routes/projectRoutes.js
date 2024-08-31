const express = require('express');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject
} = require('../controllers/projectController');

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);

module.exports = router;
