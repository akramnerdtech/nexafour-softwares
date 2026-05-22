const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/config/database');
const { port, nodeEnv } = require('./src/config/env');

const startServer = async () => {
  await connectDB();

  const server = app.listen(port, () => {
    console.log(`Server running in ${nodeEnv} mode on port ${port}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      console.log('HTTP server closed');
      try {
        await disconnectDB();
        process.exit(0);
      } catch {
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
  });
};

startServer();
