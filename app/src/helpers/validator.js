const bcrypt = require("bcryptjs");

class Validator {
  encryptPasswd = password => {
    let hashPassword = bcrypt.hashSync(password, 8);
    return hashPassword;
  };
}

export default new Validator();
