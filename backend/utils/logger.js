/**
 * Centralized Logger Utility for NovaCart Backend
 * Formats timestamps, log levels, and log entries consistently.
 */
const logger = {
  info: (message, meta = '') => {
    console.log(`[${new Date().toISOString()}] ℹ️ INFO: ${message}`, meta ? JSON.stringify(meta) : '');
  },
  warn: (message, meta = '') => {
    console.warn(`[${new Date().toISOString()}] ⚠️ WARN: ${message}`, meta ? JSON.stringify(meta) : '');
  },
  error: (message, error = null) => {
    console.error(`[${new Date().toISOString()}] ❌ ERROR: ${message}`, error ? error.stack || error : '');
  },
  debug: (message, meta = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${new Date().toISOString()}] 🐛 DEBUG: ${message}`, meta ? JSON.stringify(meta) : '');
    }
  },
};

module.exports = logger;
