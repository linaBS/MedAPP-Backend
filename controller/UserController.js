
const UserModel = require ('../model/UserModel');
const AppointmentModel = require('../model/AppointmentModel'); 
const DoctorModel = require ('../model/DoctorModel') ; 
const moment = require ('moment')


// add user : 
exports.addUser= async (req, res,) => {
    try {
        let new_user = new UserModel({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password:req.body.password,
            role:req.body.role,
            phoneNumber:req.body.phoneNumber,
            adresse: req.body.adresse,

        });
        await new_user.save();
        res.send(`user has been added to the database!`)
    }
    catch (err) { 
        console.log(err);
        res.status(500).send('Error adding user.');
    }
    
};
//Retrieve all users (Read):
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

//Retrieve a user with a specific ID (Read):
exports.getOneUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send('User not found.');
      }
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving user.');
    }
  }; 
// Delete a user with a specific ID :
  exports.deleteUser = async (req, res, next) => {
    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.send('successfully deleted');
    }

    catch (error) {
        res.send(err)
    }

next();
};
// Update a user with a specific ID:
exports.modifyUser= async (req, res) => {
    try {
      const { id } = req.params;
      const { email, role } = req.body;
  
      // Update email
      await UserModel.updateOne({ _id: id }, { email });
  
      // Update role
      await UserModel.findByIdAndUpdate(id, { role });
  
      res.send('Successful update.');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error while updating.');
    }
  };



exports.bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId } = req.params;
    const { time, patientName, doctorName, reason, date, status, notes } = req.body;  // Utilisation des variables correctes

    // Vérifier si l'utilisateur existe
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si le médecin existe
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }

    // Convertir la date et l'heure en format ISO
    const appointmentDate = moment(date, 'DD-MM-YYYY').toISOString();
    const appointmentTime = moment(time, 'HH:mm').toISOString();

    // Créer le rendez-vous
    const newAppointment = new AppointmentModel({
      patientName: patientName,  // Utilisation de la variable patientName
      doctorName: doctorName,    // Utilisation de la variable doctorName
      reason: reason,
      date: appointmentDate,
      startTime: appointmentTime,
      endTime: moment(appointmentTime).add(1, 'hour').toISOString(),
      status: status,            // Utilisation de la variable status
      notes: notes               // Utilisation de la variable notes
    });
   
    // Enregistrer le rendez-vous dans la base de données
    await newAppointment.save();

    res.status(201).json({
      success: true,
      message: 'Rendez-vous réservé avec succès',
      data: newAppointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la réservation du rendez-vous',
      error: error.message,
    });
  }
};

exports.appointmentsAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Vérifier si le médecin existe
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }

    // Récupérer les rendez-vous existants du médecin
    const existingAppointments = await AppointmentModel.find({ doctorName: doctor.name });

    // Obtenir les horaires déjà réservés
    const bookedTimeSlots = existingAppointments.map(appointment => appointment.startTime);

    // Générer tous les horaires possibles (par exemple, de 9h à 17h)
    const startTime = moment().hour(9).minute(0);
    const endTime = moment().hour(17).minute(0);
    const timeSlots = [];
    
    while (startTime.isBefore(endTime)) {
      const timeSlot = startTime.format('HH:mm');
      if (!bookedTimeSlots.includes(timeSlot)) {
        timeSlots.push(timeSlot);
      }
      startTime.add(30, 'minutes');
    }

    res.status(200).json({
      success: true,
      message: 'Horaires de rendez-vous disponibles récupérés avec succès',
      data: timeSlots,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des horaires de rendez-vous disponibles',
      error: error.message,
    });
  }
};

exports.userAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Récupérer tous les rendez-vous associés à ce user
    const appointments = await AppointmentModel.find({ patientName: user.patientName });

    res.status(200).json({
      success: true,
      message: 'Rendez-vous du user récupérés avec succès',
      data: appointments, // Ajout de la liste des rendez-vous dans la réponse
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des rendez-vous du user',
      error: error.message,
    });
  }
};


 