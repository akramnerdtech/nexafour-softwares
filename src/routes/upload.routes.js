const express = require('express');
const { uploadAvatar } = require('../controllers/upload.controller');
const { upload, handleMulterError } = require('../middleware/upload.middleware');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.post('/avatar', upload.single('avatar'), handleMulterError, uploadAvatar);

module.exports = router;
