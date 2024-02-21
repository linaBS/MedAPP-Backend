const express = require ('express'); 
const router = express.Router () ; 


const DoctorController = require ('../controller/DoctorController') ; 
//const {authenticate} = require ('../auth/VerifyToken')

router.post("/addDoctor",  DoctorController.addDoctor);
router.get("/getAllDoctor",  DoctorController.getAllDoctor);
router.get("/getOneDoctor/:doctorId",  DoctorController.getOneDoctor);
router.delete("/deleteDoctor/:id",  DoctorController.deleteDoctor);
router.put("/modifyDoctor/:id",  DoctorController.modifyDoctor); 
router.get("/doctorAppointmentsController/:id",  DoctorController.doctorAppointmentsController); 
router.put("/updateAppointmentController/:id",  DoctorController.updateAppointmentController) ; 
//router.put("/updateAppointment", DoctorController.updateAppointment) ; 
//router.put('/appointments/:appointmentsId', DoctorController.updateAppointment);





module.exports = router ; 
