const express = require('express');
const { getData , getTrend } = require('../controllers/dataController');

const router = express.Router();

router.post('/', getData);

router.post('/feature-trend', getTrend);

module.exports = router;