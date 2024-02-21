const express = require ('express')
const router = express.Router (); 

const AdminController = require ('../controller/AdminController'); 
//const { authenticate } = require('../auth/VerifyToken');

router.get("/getAllDoctor",  AdminController.getAllDoctor);
router.get("/getAllUser" ,  AdminController.getAllUser);
router.post("/changeAccountStatus" ,  AdminController.changeAccountStatus);









module.exports=router;