const express = require('express')
const {isAuth, isAdmin} = require('../utils/permissions.js')
const router = express.Router()
const {userEditImg, userProfile, userDelImg, profileEmail, profilePass} = require('../controllers/userController')

router.route('/user-profile').post(isAuth,userProfile)
router.route('/user-profile-img').post(isAuth,userEditImg).put(isAuth,userDelImg)
router.route('/user-profile-email').put(isAuth,profileEmail)
router.route('/user-profile-pass').put(isAuth,profilePass)

router.route('/admin-profile').post(isAuth,isAdmin,userProfile)
router.route('/admin-profile-img').post(isAuth,isAdmin,userEditImg).put(isAuth, isAdmin,userDelImg)
router.route('/admin-profile-email').put(isAuth,isAdmin,profileEmail)
router.route('/admin-profile-pass').put(isAuth,isAdmin,profilePass)
module.exports = router