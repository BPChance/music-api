const app = require('./src/app');
const logger = require('./src/utils/logger');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`API server running on http://localhost:${port}`, {
    port,
    timestamp: new Date().toISOString(),
  });
  console.log(`API server running on http://localhost:${port}`);
});
