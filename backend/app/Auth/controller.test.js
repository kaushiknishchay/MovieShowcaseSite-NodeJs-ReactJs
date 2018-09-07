const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const User = require('../../models/User');

describe('Auth Controller', function () {
  it('==> Register', function (done) {
    const req = {
      body: {
        name: 'New User',
        email: 'user@example.com',
        password: '123456'
      }
    };

    const newUser = new User(req.body);

    newUser.validate(function (err) {
      expect(err).to.not.exist;
      done();
    });
  });
});
