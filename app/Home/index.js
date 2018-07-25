const controller = require('./controller');
const router = require('express').Router();



module.exports = function (passport) {

  router.get('/', function (req, res) {
    res.send('Welcome to your Node.JS Project.');
  });

  router.get('/health', controller.index);

  return router;
};
