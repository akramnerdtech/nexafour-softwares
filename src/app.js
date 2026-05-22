const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const { upload, isProduction, nodeEnv } = require('./config/env');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());

// TEMPORARY DEVELOPMENT CORS
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

app.use('/api', limiter);

if (nodeEnv !== 'test') {
  app.use(morgan(isProduction ? 'combined' : 'dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files
app.use(
  '/uploads',
  express.static(path.resolve(process.cwd(), upload.dir))
);

// API Routes
app.use('/api/v1', routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;