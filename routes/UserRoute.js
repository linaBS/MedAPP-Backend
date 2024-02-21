const express = require ('express')
const router = express.Router (); 

const UserController = require ('../controller/UserController'); 
//const { authenticate } = require('../auth/VerifyToken');



router.post('/add',  UserController.addUser);
router.get('/',   UserController.getAllUser);
router.get('/:userId',  UserController.getOneUser);
router.delete('/:id',  UserController.deleteUser); 
router.put('/:id', UserController.modifyUser);
router.post('/:bookAppointment/:userId/:doctorId',  UserController.bookAppointment)
router.get('/appointmentsAvailability/:userId/:doctorId',  UserController.appointmentsAvailability)
//router.get('/user/userAppointments/:userId', UserController.userAppointments)
router.get('/userAppointments/:userId',  UserController.userAppointments);
//router.post('/signup',  UserController.signup); 
// router.post('/login', UserController.login);

module.exports=router;



