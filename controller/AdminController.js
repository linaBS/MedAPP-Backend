const UserModel = require ('../model/UserModel')
const DoctorModel = require ('../model/DoctorModel')

// get all user : 
exports.getAllUser = async (req, res) => {
  try {
      await UserModel.find({})
          .then(result => {res.send(result)})
  }

  catch (error) {
      console.log(error) 
      res.status(500).send('Error retrieving users.');
  }
  
}; 
//Retrieve all doctor (Read):
exports.getAllDoctor = async (req, res) => {
  try {
      await DoctorModel.find({})
          .then(result => {res.send(result)})
  }

  catch (err) {
      console.log(err) 
      res.status(500).send('Error retrieving doctors.');
  }
  
}; 
// changeAccountStatus :
exports.changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await UserModel.findOne({ _id: doctor.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};
  