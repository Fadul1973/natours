const router = require('express').Router();

const userController = require('./../controllers/user-controller');
const authController = require('./../controllers/authController');

// Auth route
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUsers);

module.exports = router;
