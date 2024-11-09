const express = require('express')
const router = express.Router()
const passport = require("passport");
const { signup, login ,logout} = require('../controllers/user');
const { authenticateforlogin } = require('../middleware');
const wrapAsync=require('../utils/wramAsync')

router.post('/login',authenticateforlogin,login);

router.post("/register", wrapAsync(signup))

router.post("/logout",logout)


module.exports = router