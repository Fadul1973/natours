const router = require('express').Router();

const userController = require('./../controler/user-controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUsers);

module.exports = router;
