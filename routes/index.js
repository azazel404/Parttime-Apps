const express = require('express');
const router = express.Router();


const auth = require('../middleware/require_auth');

const UserController = require('../controllers/UserController')
const FreetimeController = require('../controllers/FreetimeController')
const JobsController = require('../controllers/JobsController')
const HiredjobController = require('../controllers/HiredjobController')



router.route('/register').post(UserController.register)
router.route('/login').post(UserController.login)

router.route('/users/update-password').post(auth,UserController.updatePassword)
router.route('/users').get(UserController.indexUser)
router.route('/users/update').put(auth,UserController.updateUser)
router.route('/users/logout').get(UserController.logout)


router.route('/freetime').get(FreetimeController.index)
router.route('/freetime/add').post(FreetimeController.store)
router.route('/freetime/:parttimerId').get(FreetimeController.show)
router.route('/freetime/:parttimerId').put(FreetimeController.update)
router.route('/freetime/:parttimerId').delete(FreetimeController.delete)

router.route('/jobs').get(auth,JobsController.index)
router.route('/jobs/add').post(auth,JobsController.store)
router.route('/jobs/:employeerId').get(auth,JobsController.show)
router.route('/jobs/:employeerId').put(auth,JobsController.update)
router.route('/jobs/:employeerId').delete(auth,JobsController.delete)

router.route('/hire').get(HiredjobController.test)
router.route('/jobs/apply/:id').get(HiredjobController.ShowApply)
router.route('/jobs/apply').post(HiredjobController.AddApplyJob)


module.exports = router