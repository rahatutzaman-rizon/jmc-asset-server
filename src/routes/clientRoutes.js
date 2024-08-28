const express = require('express');
const { getClients } = require('../controllers/clientController');
const router = express.Router();

router.get('/client', getClients);

module.exports = router;
