const express = require ('express'); 
const router = express.Router () ; 

const AuthController = require ('../controller/AuthController')





router.post("/signup", AuthController.signup )
router.post("/login", AuthController.login)



module.exports = router ; 
/* {
  
  "name": "essai123",
  "lastName": "bbbb",
  "email": "essai123@gmail.com",
  "password": "12345678",
  "role": "patient"
} 
 {
  
  "name": "doct1",
  "lastName": "yeux",
  "email": "doct1.yeux@gmail.com",
  "password": "12345678",
  "role": "doctor"
} */