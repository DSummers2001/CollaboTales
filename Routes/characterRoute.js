const { newCharacter } = require('../Controllers/characterController');

const router = require('express').Router();

router.post("/newCharacter", newCharacter);

module.exports = router;