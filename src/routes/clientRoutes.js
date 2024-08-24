const express = require('express');
const { getClients } = require('../controllers/clientController');

const router = express.Router();

router.get('/', getClients);

module.exports = router;
