const { register } = require('../Controllers/userController');
const { login } = require('../Controllers/userController');
const { userExists } = require('../Controllers/userController');

const router = require('express').Router();

router.post("/register",register);
router.post("/login", login);
router.post("/userExists", userExists);

module.exports = router;