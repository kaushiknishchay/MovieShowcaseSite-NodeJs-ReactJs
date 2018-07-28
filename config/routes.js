'use strict';

module.exports = function (app, passport) {

  // Home Routes
  app.use('/', require('../app/Auth')(passport));
  app.use('/', require('../app/Movies')(passport));
  app.use('/', require('../app/Cinema')(passport));
  app.use('/', require('../app/Home')(passport));

  /**
   * Error handling
   */
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
        || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
