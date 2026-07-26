const express = require('express');
const { getHealthStatus } = require('../controllers/healthController');

const router = express.Router();

/**
 * @route   GET /api/v1/health
 * @desc    Health check endpoint returning server uptime & MongoDB status
 * @access  Public
 */
router.get('/', getHealthStatus);

module.exports = router;
