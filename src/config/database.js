const mongoose = require('mongoose');
const { mongodbUri, nodeEnv } = require('./env');

const connectionOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const registerConnectionEvents = () => {
  const { connection } = mongoose;

  connection.on('connected', () => {
    console.log(`MongoDB connected [${connection.host}] — database: ${connection.name}`);
  });

  connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

  connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });

  connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
  });
};

const connectDB = async () => {
  console.log("MONGODB_URI =", mongodbUri);
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  registerConnectionEvents();

  try {
    const conn = await mongoose.connect(mongodbUri, connectionOptions);
    return conn.connection;
  } catch (error) {
    console.error(`MongoDB failed to connect: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(`MongoDB disconnect error: ${error.message}`);
    throw error;
  }
};

const getConnectionState = () => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  return states[mongoose.connection.readyState] || 'unknown';
};

if (nodeEnv === 'development') {
  mongoose.set('debug', true);
}

module.exports = { connectDB, disconnectDB, getConnectionState };
