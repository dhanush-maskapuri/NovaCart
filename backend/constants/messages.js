/**
 * Standard Application & API Response Messages
 */
module.exports = {
  HEALTH: {
    OK: 'NovaCart API v1 is healthy and running smoothly.',
    DEGRADED: 'NovaCart API v1 is running with degraded services.',
  },
  SERVER: {
    STARTUP: 'NovaCart Express Server initialized.',
    SHUTDOWN: 'NovaCart Express Server shutting down gracefully...',
    INTERNAL_ERROR: 'An unexpected internal server error occurred.',
  },
  DATABASE: {
    CONNECTED: 'MongoDB Database connected successfully.',
    DISCONNECTED: 'MongoDB Database connection lost.',
    ERROR: 'MongoDB Database connection failure.',
  },
  AUTH: {
    SUCCESS: 'Authentication successful.',
    UNAUTHORIZED: 'Authentication required. Please log in.',
    FORBIDDEN: 'Access denied. You do not have permission for this resource.',
    TOKEN_EXPIRED: 'Session expired. Please log in again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
  },
  RESPONSE: {
    NOT_FOUND: 'Requested resource not found.',
    BAD_REQUEST: 'Invalid request payload or query parameters.',
    RATE_LIMITED: 'Too many requests from this IP. Please try again later.',
  },
};
