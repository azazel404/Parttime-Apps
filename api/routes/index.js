const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.route('/users').get(UserController.index)
router.route('/users').post(UserController.store)
router.route('/users/:id').get(UserController.show)
router.route('/users/:id').put(UserController.update)
router.route('/users/:id').delete(UserController.delete)

module.exports = router