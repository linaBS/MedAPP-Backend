const Express = require('express')
//const mongoose = require('mongoose');
const UserRoute = require('./routes/UserRoute');
const DoctorRoute = require('./routes/DoctorRoute');
//const AppointmentRoute = require('./routes/AppointmentRoute');
const AdminRoute = require ('./routes/AdminRoute') ; 
const AuthRoute = require ('./routes/AuthRoute');
const bodyParser = require('body-parser');


const app = Express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//routes: 
app.use('/auth', AuthRoute);

//User : 
//POST:localhost:3000/user/add :
//GET:localhost:3000/user :
//GET:localhost:3000/user/123
//DELETE:localhost:3000/user/123
//PUT:localhost:3000/user/123
//POST:localhost:3000/user/signup
//POST:localhost:3000/user/login
//POST: localhost:3000/user/bookAppointment/647513userid/642doctorid
//get : localhost:3000/user/appointmentsAvailability/647
app.use('/user', UserRoute);

//Doctor :
//POST: http://localhost:3000/doctor/addDoctor
//GET: http://localhost:3000/doctor/getAllDoctor
//Get:http://localhost:3000/doctor/getOneDoctor/647
//DELETE: http://localhost:3000/doctor/deleteDoctor/647
//PUT: http://localhost:3000/doctor/modifyDoctor/647
app.use('/doctor', DoctorRoute);

//admin : 

app.use('/admin' , AdminRoute) 


//Appointment :
//POST: http://localhost:3000/appointment/addAppointment
//GET: http://localhost:3000/appointment/getAllAppointment
//GET: http://localhost:3000/appointment/getOneAppointment/647d
//DELETE: http://localhost:3000/appointment/deleteAppointment/647d
//PUT: http://localhost:3000/appointment/modifyAppointment/647d
//app.use('/appointment', AppointmentRoute)










module.exports = app;
