const bcrypt = require ('bcrypt') ;
const jwt = require('jsonwebtoken');
const UserModel = require ('../model/UserModel');


exports.signup = async (req, res) => {
  
    try {
      const { name, lastName, email, password, role } = req.body;
  
      // Vérifiez si l'utilisateur existe déjà
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).send({ message: 'Cet utilisateur existe déjà' });
      }
      
      // Hachez le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Créez un nouvel utilisateur
      const newUser = new UserModel({ name, lastName, email, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).send({ message: 'Inscription réussie' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur lors de l\'inscription' });
    }
  };
  
    exports.login = (req, res) => {
      UserModel.findOne({ email: req.body.email })
          .then(user => {
              if (!user) {
                  return res.status(401).json({ error: 'Utilisateur non trouvé !' });
              }
              bcrypt.compare(req.body.password, user.password)
                  .then(valid => {
                      if (!valid) {
                          return res.status(401).json({ error: 'Mot de passe incorrect !' });
                      }
                      res.status(200).json({
                          userId: user._id,
                          token: jwt.sign(
                              { userId: user._id },
                              'RANDOM_TOKEN_SECRET',
                              { expiresIn: '24h' }
                          )
                      });
                  })
                  .catch(error => res.status(500).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));
   };