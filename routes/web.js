const express = require('express')
const FrontController = require('../controllers/FrontContoller')
const CourseContoller = require('../controllers/CourseContoller')
const AdminController = require('../controllers/Admin/AdminController')
const checkAuth = require('../middleware/auth')
// console.log(express)
const router = express.Router()
// console.log(router)
router.get('/',FrontController.login)
router.get('/team',FrontController.team)
router.get('/about', checkAuth,FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/dashboard', checkAuth,FrontController.dashboard)
// router.post('/dashboard',FrontController.dashboard)
router.get('/registration',FrontController.registration)
//user insert
 router.post('/user_insert',FrontController.userInsert)

// couser contoller
router.post('/course-insert',checkAuth,CourseContoller.courseInsert)
router.get('/courseDisplay', checkAuth,CourseContoller.courseDisplay)
router.get('/courseview/:id',checkAuth, CourseContoller.courseView)
router.get('/courseEdit/:id', checkAuth, CourseContoller.courseEdit)
router.post('/course_update/:id', checkAuth,CourseContoller.courseUpdate)
router.get('/course_delete/:id', checkAuth,CourseContoller.courseDelete)
router.post('/varify_login', FrontController.varifyLogin)
router.get('/profile', checkAuth, FrontController.Profile)
router.post('/profile/update', checkAuth, FrontController.updateProfile)
 router.post('/changepassword',checkAuth,FrontController.changepassword)


router.get('/logout', FrontController.logOut)
// admin controller
router.get('/admin/getAllData', checkAuth, AdminController.GetAllData)
//upadate status
router.post('/update_approve/:id',checkAuth, AdminController.UpdateStatus)









 module.exports = router

                            








