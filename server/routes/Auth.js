const { signup, signin, googleAuth } = require('../controllers/Auth')
const express = require('express');

const router = express.Router();

//CREATE USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//GOOGLE AUTH
router.post("/google", googleAuth )

module.exports = router;