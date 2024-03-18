const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const key  = require('../config/keys')

const loginUser = async (req, res) => {
  try {
    // getting auth data from req body
    const { username, password } = req.body;

    //here is just hardcoded to Check if username and password are valid as it was not the main task
    if (username === 'ali' && password === 'password') {
      
      const expiresInOneMonth = 30 * 24 * 60 * 60;
      const token = jwt.sign({ username }, key.secretKey, { expiresIn: expiresInOneMonth});

      res.status(200).json({ success: true, token });
    } else {
      throw new HttpError('Invalid credentials', 401);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.status).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  login: loginUser,
};
