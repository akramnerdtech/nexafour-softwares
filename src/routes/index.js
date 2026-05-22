const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const uploadRoutes = require('./upload.routes');
const adminAuthRoutes = require('./adminAuth.routes');
const adminRoutes = require('./admin.routes');
const heroRoutes = require('./hero.routes');
const aboutRoutes = require('./about.routes');
const serviceRoutes = require('./service.routes');
const blogRoutes = require('./blog.routes');
const testimonialRoutes = require('./testimonial.routes');
const teamMemberRoutes = require('./teamMember.routes');
const contactRoutes = require('./contact.routes');
const { getConnectionState } = require('../config/database');

const router = express.Router();

router.get('/health', (_req, res) => {
  const dbState = getConnectionState();

  res.status(dbState === 'connected' ? 200 : 503).json({
    success: dbState === 'connected',
    message: 'API is running',
    database: dbState,
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/uploads', uploadRoutes);
router.use('/hero', heroRoutes.publicRouter);
router.use('/about', aboutRoutes.publicRouter);
router.use('/services', serviceRoutes.publicRouter);
router.use('/blogs', blogRoutes.publicRouter);
router.use('/testimonials', testimonialRoutes.publicRouter);
router.use('/team', teamMemberRoutes.publicRouter);
router.use('/contact', contactRoutes.publicRouter);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
