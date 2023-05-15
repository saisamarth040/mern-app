
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

 function generateRandomPassword () {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };

  function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretKey, { algorithm: 'HS512' }, function(err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
}
module.exports = {generateToken, generateRandomPassword}