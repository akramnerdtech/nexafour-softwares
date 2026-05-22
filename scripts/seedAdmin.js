/**
 * Create the initial admin account in the Admin collection.
 * Usage: node scripts/seedAdmin.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin.model');

const seedAdmin = async () => {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Set MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`Admin already exists: ${ADMIN_EMAIL}`);
  } else {
    await Admin.create({
      name: ADMIN_NAME || 'Admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    console.log(`Admin created: ${ADMIN_EMAIL}`);
  }

  await mongoose.disconnect();
};

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
