const express = require('express');
const multer = require('multer');
const { getClients, addClient, deleteClient } = require('../controllers/clientController');

const router = express.Router();
const upload = multer(); // Middleware for handling multipart/form-data (file uploads)

router.get('/', getClients);
router.post('/', upload.single('image'), addClient);
router.delete('/:id', deleteClient);

module.exports = router;
