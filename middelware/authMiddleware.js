
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

module.exports = authenticate;



 /*const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');



const authenticate = async (req, res, next) => {
  // Get the token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, 'your_secret_key');
    // Add the decoded token payload to the request object
    req.user = decodedToken;

    // Check if the user exists
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
}; */

