const express = require('express');
const {
  getDashboard,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/admin.controller');
const { updateUserRules, userIdParam } = require('../validators/user.validator');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');
const heroRoutes = require('./hero.routes');
const aboutRoutes = require('./about.routes');
const serviceRoutes = require('./service.routes');
const blogRoutes = require('./blog.routes');
const testimonialRoutes = require('./testimonial.routes');
const teamMemberRoutes = require('./teamMember.routes');
const contactRoutes = require('./contact.routes');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/dashboard', getDashboard);

router.get('/users', getUsers);
router.get('/users/:id', userIdParam, validate, getUserById);
router.patch('/users/:id', updateUserRules, validate, updateUser);
router.delete('/users/:id', userIdParam, validate, deleteUser);

router.use('/hero', heroRoutes.adminRouter);
router.use('/about', aboutRoutes.adminRouter);
router.use('/services', serviceRoutes.adminRouter);
router.use('/blogs', blogRoutes.adminRouter);
router.use('/testimonials', testimonialRoutes.adminRouter);
router.use('/team', teamMemberRoutes.adminRouter);
router.use('/contacts', contactRoutes.adminRouter);

module.exports = router;
