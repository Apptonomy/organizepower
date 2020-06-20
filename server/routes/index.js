const { Router } = require('express');
const { movementRouter } = require('./movements');
const { profileRouter } = require('./profile');
const { signupRouter } = require('./signup');
const { loginRouter } = require('./login');
const { twilioRouter } = require('./twilio');

const routes = Router();

routes.use('/movement', movementRouter);
routes.use('/profile', profileRouter);
routes.use('/signup', signupRouter);
routes.use('/login', loginRouter);
routes.use('/twilio', twilioRouter);

routes.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

module.exports = {
  routes,
};
