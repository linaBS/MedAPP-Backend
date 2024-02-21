const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    
    doctorName: {
        type: String,
        required: [true, "name is required"],
        minLenght: [3, "name must contain at least 3 characters"],
        maxLenght: [50, "name must contain a maximum of 50 characters"],
      },
      doctorLastName: {
        type: String,
        required: [true, "lastname is required"],
        minLenght: [3, "lastname must contain at least 3 characters"],
        maxLenght: [50, "lastname must contain a maximum of 50 characters"],
      },
    
      doctorEmail: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "this email is already in use"],
      },
    
      doctorPassword: {
        type: String,
        required: [true, "password is required"],
        //minLenght: [8, "password must contain at least 8 characters"],

      },
    specialization: {
        type: String,
        required: [true, "specialization is required"],
    },
    experience: {
        type: String,
        required: [true, "experience is required"],
    },
    adress: {
        type: String,
        required: [true, "address is required"],
    },
    phoneNumber: {
        type: String,
        required: [true, "phone no is required"],
    },
    workingDays: {
        type: String,
        required: [true, "wrok timing is required"],
    },
    workingHours: {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      }
    },
    clinicAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
   

});
const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

  
   
 
  
  
  
  
  
  
  
  