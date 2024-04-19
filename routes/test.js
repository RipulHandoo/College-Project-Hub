const express = require('express');
const router = express.Router();

const  serverHealth  = require('../utils/health');

router.get("/health", serverHealth);

module.exports = router;
