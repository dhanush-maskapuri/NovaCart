const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { getDBStatus } = require('../database/connectDB');
const HTTP_STATUS = require('../constants/httpStatusCodes');
const MESSAGES = require('../constants/messages');
const config = require('../config/env');

/**
 * Health Check Controller
 * GET /api/v1/health
 */
const getHealthStatus = asyncHandler(async (req, res) => {
  const dbStatus = getDBStatus();
  const uptimeSeconds = process.uptime();
  const uptimeFormatted = `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${Math.floor(uptimeSeconds % 60)}s`;

  const isHealthy = dbStatus.status === 'connected';

  const healthData = {
    app: 'NovaCart API',
    version: '1.0.0',
    environment: config.env,
    timestamp: new Date().toISOString(),
    uptime: uptimeFormatted,
    database: {
      provider: 'MongoDB via Mongoose',
      status: dbStatus.status,
      host: dbStatus.host,
      name: dbStatus.name,
    },
  };

  const message = isHealthy ? MESSAGES.HEALTH.OK : MESSAGES.HEALTH.DEGRADED;
  const statusCode = isHealthy ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;

  return ApiResponse.success(res, message, healthData, statusCode);
});

module.exports = {
  getHealthStatus,
};
