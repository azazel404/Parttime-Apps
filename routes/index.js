const express = require('express');
const router = express.Router();
const auth = require('../middleware/require_auth');

const UserController = require('../controllers/UserController')
const FreetimeController = require('../controllers/FreetimeController')
const JobsController = require('../controllers/JobsController')



router.route('/auth/facebook').get(UserController.authFacebook)
router.route('/auth/facebook/callback').post(UserController.authFacebookCallback)
router.route('/users').put(UserController.currentUser)
router.route('/auth/logout').get(UserController.logout)


router.route('/freetime').get(FreetimeController.index)
router.route('/freetime').post(FreetimeController.store)
router.route('/freetime/:id').get(FreetimeController.show)
router.route('/freetime/:id').put(FreetimeController.update)
router.route('/freetime/:id').delete(FreetimeController.delete)

router.route('/jobs').get(JobsController.index)
router.route('/jobs').post(JobsController.store)
router.route('/jobs/:id').get(JobsController.show)
router.route('/jobs/:id').put(JobsController.update)
router.route('/jobs/:id').delete(JobsController.delete)


module.exports = router