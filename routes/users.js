const express = require('express');

const router = express.Router();

const userController = require('../controllers/usersController');


router.get('/profile', userController.profile);

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);


router.post('/create', userController.create);
router.post('/create-session', userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;