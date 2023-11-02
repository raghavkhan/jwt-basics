const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authMiddleware = require('../middleware/auth');
// one way
router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/login').post(login);

// another way0
// router.post('/login', login);
// router.get('/dashboard', dashboard);

module.exports = router;
