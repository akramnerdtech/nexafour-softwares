const express = require('express');
const { updateProfile } = require('../controllers/user.controller');
const { updateProfileRules } = require('../validators/user.validator');
const validate = require('../middleware/validate.middleware');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.patch('/profile', updateProfileRules, validate, updateProfile);

module.exports = router;
