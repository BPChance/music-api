const express = require('express');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const logger = require('./utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Music API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// middleware
app.use(express.json());

// routes
app.use('/artist', artistRoutes);
app.use('/albums', albumRoutes);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// error handling
app.use((err, req, res, next) => {
  logger.error('Server error', {
    error: err.message,
    stack: err.stack,
  });
  res.status(500).json({ error: 'Something is broken' });
});

module.exports = app;
