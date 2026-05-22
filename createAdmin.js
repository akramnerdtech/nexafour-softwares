require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin.model');

const ADMIN = {
  name: 'Admin',
  email: 'admin@example.com',
  password: 'ChangeMe123',
};

const createAdmin = async () => {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);

    const existing = await Admin.findOne({ email: ADMIN.email });

    if (existing) {
      console.log(`Admin already exists: ${ADMIN.email}`);
    } else {
      await Admin.create(ADMIN);
      console.log(`Admin created successfully: ${ADMIN.email}`);
    }
  } catch (error) {
    console.error('Failed to create admin:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

createAdmin();
