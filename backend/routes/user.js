const express = require('express')
const router = express.Router()
const passport = require("passport");
const { signup, login ,logout} = require('../controllers/user');
const wrapAsync=require('../utils/wrapAsync')

router.post('/login',login);

router.post("/register", wrapAsync(signup))

router.post("/logout",logout)


module.exports = router