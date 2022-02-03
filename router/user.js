const express = require('express')
const {isAuth, isAdmin} = require('../utils/permissions.js')
const router = express.Router()
const {userPassEdit, userProfile, userPicDel, userEdit} = require('../controllers/userController')

router.route('/user-profile').post(isAuth,userProfile)
router.route('/user-profile-edit').put(isAuth, userEdit).post(isAuth, userPicDel)
router.route('/user-pass').put(userPassEdit)


router.route('/admin-profile').post(isAuth,isAdmin,userProfile)
router.route('/admin-profile-edit').put(isAuth,isAdmin, userEdit).post(isAuth, isAdmin,userPicDel)
router.route('/admin-pass').put(userPassEdit)

module.exports = router