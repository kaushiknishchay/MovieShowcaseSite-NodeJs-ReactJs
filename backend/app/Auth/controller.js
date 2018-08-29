const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const crypto = require('../../utils/crypto');
const ConfigKeys = require('../../config/keys');

const login = function (passport) {
  return function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'Email or Password is wrong.',
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          next(err);
        }
        const role = user.role === 'admin' ? { isAdmin: true } : {};
        const token = jwt.sign(user.toObject(), ConfigKeys.JWTKey);
        return res.json({
          success: true,
          token,
          ...role
        });
      });
    })(req, res);
  };
};

const register = function (req, res, next) {
  const {
    name,
    email,
    password,
    admin,
  } = req.body;

  const hashedPassword = crypto.encrypt(password);
  const userVal = {
    name,
    email,
    password: hashedPassword,
    role: admin ? 'admin' : 'user',
  };
  const user = new User(userVal);
  user.save()
    .then((user) => {
      res.json({
        // user,
        success: true,
      });
    })
    .catch(e => next(e));
};

const getUsers = function (req, res, next) {
  const {
    userId
  } = req.params;

  if (userId) {
    User
      .findById(userId)
      .exec()
      .then(user => res.json(user))
      .catch(e => next(e));
  } else {
    User
      .find()
      .exec()
      .then(user => res.json(user))
      .catch(e => next(e));
  }

};

/* Delete a user */
const deleteUserById = function (req, res, next) {
  const {
    userId
  } = req.params;

  User
    .findByIdAndRemove(userId)
    .exec()
    .then(() => res.json({ success: true }))
    .catch(e => next(e));
};

module.exports = {
  register,
  getUsers,
  deleteUserById,
  login,
};