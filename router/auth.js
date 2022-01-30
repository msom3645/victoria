const router = require('express').Router()
const {reg, regModel, login, resetPass, updateUser} = require('../controllers/authController.js')

router.route('/reg').post(reg)
router.route('/reg-model').post(regModel)
router.route('/login').post(login)
router.route('/reset-pass').post(resetPass)
router.route('/user').put(updateUser)

module.exports = router