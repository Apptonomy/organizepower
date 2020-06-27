const { Router } = require('express');
const axios = require('axios');

const charityRouter = Router();

charityRouter.get('/', (req, res) => {
  const { search, pageSize } = req.query;
  axios.get('https://api.data.charitynavigator.org/v2/Organizations', {
    params: {
      app_key: process.env.CHARITY_NAVIGATOR_KEY,
      app_id: process.env.CHARITY_NAVIGATOR_ID,
      search,
      pageSize,
      cfcCharities: true,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err, 'unable to search for charities')
      res.sendStatus(500);
    });
});

charityRouter.get('/details', (req, res) => {
  const { ein } = req.query;
  axios.get(`https://api.data.charitynavigator.org/v2/Organizations/${ein}`, {
    params: {
      app_key: process.env.CHARITY_NAVIGATOR_KEY,
      app_id: process.env.CHARITY_NAVIGATOR_ID,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err, 'unable to get charity details');
      res.sendStatus(500);
    });
});

module.exports = {
  charityRouter,
};
