const express = require('express');
const { login, getMe } = require('../controllers/adminAuth.controller');
const { adminLoginRules } = require('../validators/admin.validator');
const validate = require('../middleware/validate.middleware');
const { authenticateAdmin } = require('../middleware/adminAuth.middleware');

const router = express.Router();

router.post('/login', adminLoginRules, validate, login);
router.get('/me', authenticateAdmin, getMe);

module.exports = router;
