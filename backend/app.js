const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('path');

const config = require('./config/env');
const requestLogger = require('./middlewares/requestLogger');
const apiRateLimiter = require('./middlewares/rateLimiter');
const notFoundHandler = require('./middlewares/notFoundMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');

const v1Router = require('./routes/v1Router');

/**
 * Initialize Express Application
 */
const app = express();

// 1. Security HTTP Headers with cross-origin resource policy
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// 2. Dynamic Localhost & Production CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

// 3. Rate Limiting for API routes
app.use('/api', apiRateLimiter);

// 4. Request Compression
app.use(compression());

// 5. Cookie Parser
app.use(cookieParser());

// 6. Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 7. Request Logging
app.use(requestLogger);

// 8. Static File Uploads Directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 9. API Versioning (/api/v1) Mount Point
app.use('/api/v1', v1Router);

// Backward Compatibility Aliases (/api/health, /api/products, etc.)
app.use('/api', v1Router);

// 10. 404 & Unknown Route Handler
app.use(notFoundHandler);

// 11. Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
