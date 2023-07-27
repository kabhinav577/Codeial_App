const express = require('express');

const router = express.Router();
const userAPI = require('../../../controllers/api/v1/users_api');

router.post('/create-session', userAPI.createSession);

module.exports = router;