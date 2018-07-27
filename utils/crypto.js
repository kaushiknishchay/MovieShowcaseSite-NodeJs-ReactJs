var CryptoJS = require('crypto-js');

const secret = '8q#d(wYm(@P4yE_*';

const encrypt = function (password) {
  return CryptoJS.AES.encrypt(password, secret).toString();
};

const decrypt = function (hash) {
  const bytes = CryptoJS.AES.decrypt(hash.toString(), secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encrypt,
  decrypt,
};
