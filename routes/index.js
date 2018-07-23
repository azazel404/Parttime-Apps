const express = require('express');
const router = express.Router();


const auth = require('../middleware/require_auth');

const UserController = require('../controllers/UserController')
const FreetimeController = require('../controllers/FreetimeController')
const JobsController = require('../controllers/JobsController')
const HiredjobController = require('../controllers/HiredjobController')



router.route('/auth/facebook').get(UserController.authFacebook)
router.route('/auth/facebook/callback').post(UserController.authFacebookCallback)
router.route('/users').put(UserController.currentUser)
router.route('/auth/logout').get(UserController.logout)


router.route('/freetime').get(FreetimeController.index)
router.route('/freetime/add').post(FreetimeController.store)
router.route('/freetime/:parttimerId').get(FreetimeController.show)
router.route('/freetime/:parttimerId').put(FreetimeController.update)
router.route('/freetime/:parttimerId').delete(FreetimeController.delete)

router.route('/jobs').get(JobsController.index)
router.route('/jobs/add').post(JobsController.store)
router.route('/jobs/:employeerId').get(JobsController.show)
router.route('/jobs/:employeerId').put(JobsController.update)
router.route('/jobs/:employeerId').delete(JobsController.delete)


router.route('/jobs/apply/:employeerId').post(HiredjobController.ShowApply)
router.route('/jobs/apply').post(HiredjobController.AddApplyJob)


module.exports = router