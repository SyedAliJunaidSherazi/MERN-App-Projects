const express = require('express');
const ingestController = require('../controllers/ingest-Controller');

const router = express.Router();


// Ingest data route
router.post('/ingest', ingestController.ingestData);

// Basic API route for frontend data visualization
router.get('/data', ingestController.getData);

module.exports = router;
