const { Router } = require('express');
const { movementRouter } = require('./movements');
const { commentRouter } = require('./comments');
const { profileRouter } = require('./profile');
const { signupRouter } = require('./signup');
const { loginRouter } = require('./login');
const { twilioRouter } = require('./twilio');
const { charityRouter } = require('./charity');

const routes = Router();

routes.use('/movement', movementRouter);
routes.use('/comment', commentRouter);
routes.use('/profile', profileRouter);
routes.use('/signup', signupRouter);
routes.use('/login', loginRouter);
routes.use('/twilio', twilioRouter);
routes.use('/charity', charityRouter);

routes.get('/logout', (req, res) => {
  req.logout();
  res.send('logged out');
});

module.exports = {
  routes,
};
