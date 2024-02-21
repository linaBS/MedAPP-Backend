const DoctorModel = require ('../model/DoctorModel');
const UserModel = require ('../model/UserModel');
const AppointmentModel = require ('../model/AppointmentModel') ; 

exports.addDoctor = async(req,res) => {
  try {
    
      let new_doctor = new DoctorModel({
        doctorName: req.body.doctorName,
        doctorLastName: req.body.doctorLastName,
        doctorEmail: req.body.doctorEmail,
        doctorPassword:req.body.doctorPassword,
          specialization:req.body.specialization,
          experience:req.body.experience, 
          adress: req.body.adress,
          phoneNumber:req.body.phoneNumber , 
          workingDays:req.body.workingDays,
          workingHours:req.body.workingHours, 
          clinicAddress:req.body.clinicAddress, 

      });

      await new_doctor.save();
      res.send(`doctor has been added to the database!`)
  }
  catch (err) { 
      console.log(err);
      res.status(500).send('Error adding doctor.');
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

//Retrieve a doctor with a specific ID (Read):
exports.getOneDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      const doctor = await DoctorModel.findById(doctorId);
      if (!doctor) {
        return res.status(404).send('Doctor not found.');
      }
  
      res.json(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving doctor.');
    }
  }; 
  // Delete a doctor with a specific ID :
  exports.deleteDoctor = async (req, res, ) => {
    try {
        await DoctorModel.deleteOne({ _id: req.params.id });
        res.send('successfully deleted');
    }

    catch (error) {
        res.send(err)
    }


};
// Update a doctor with a specific ID:
exports.modifyDoctor= async (req, res) => {
    try {
      const { id } = req.params;
      const { doctorEmail, workingDays, workingHours, doctorPassword } = req.body;
  
      // Update email
      await DoctorModel.updateOne({ _id: id }, { doctorEmail });

      // Update password:
      await DoctorModel.updateOne({ _id: id }, { doctorPassword });

  
      // Update workingDays
      await DoctorModel.findByIdAndUpdate(id, { workingDays });

      // Update workingHours
      await DoctorModel.findByIdAndUpdate(id, { workingHours });

  
      res.send('Successful update.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error while updating.');
    }
  };

// récupère les rendez-vous d'un médecin  
exports.doctorAppointmentsController = async (req, res) => {
 
    try {
      const { id } = req.params;
  
      const doctor = await DoctorModel.findById(id);
      if (!doctor) {
        return res.status(404).send('Doctor not found.');
      }

    // Récupérer tous les rendez-vous associés à ce médecin
    const appointments = await appointmentModel.find({ doctorName: doctor.doctorName });

    res.status(200).json({
      success: true,
      message: 'Rendez-vous du médecin récupérés avec succès',
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des rendez-vous du médecin',
      error: error.message,
    });
  }
};

// Update a appointment with a specific ID:
exports.updateAppointmentController = async (req, res) => {
  try {
      const { id } = req.params;
      const { patientName, doctorName, reason, date, startTime, endTime, status, notes } = req.body;

       // Vérifier si le rendez-vous existe dans la collection des rendez-vous
    const appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    } 
      // Update appointment
      await AppointmentModel.updateOne({ _id: id }, { patientName }, { doctorName }, { reason }, { date },
          { startTime }, { endTime }, { status }, { notes });


      res.send('Successful update.');
  } catch (err) {
      console.error(err);
      res.status(500).send('Error while updating.');
  }
};  





 