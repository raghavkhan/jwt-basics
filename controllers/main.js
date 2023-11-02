const { BadRequest } = require('../errors');
// const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');
///////////////////////////////////////////////////////////////////////////////////////////////////
//we don't need to setup try catch block as we have package installed express-async-errors
// const login = async (req, res) => {
//   try {
//   } catch (error) {}
// };

// const dashboard = async (req, res) => {
//   try {
//   } catch (error) {}
// };
////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
  const { username, password } = req.body;
  //mongoose validation
  // Joi
  //check in the controller

  if (!username || !password) {
    // throw new CustomAPIError('Please provide username and password', 400);
    throw new BadRequest('Please provide username and password');
  }

  //just for demo, normally provided by DB!
  const id = new Date().getDate();

  //try to keep payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'user created', token });
  // res.send(
  // `Fake Login/Register/Signup Route. My name is: ${username} and My Password is ${password}`
  // );
};
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data raghav, your lucky number is ${luckyNumber}`,
  });
};
module.exports = { login, dashboard };
