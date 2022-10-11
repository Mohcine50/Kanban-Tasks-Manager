const bcrypt = require("bcrypt");
const Joi = require("joi");
exports.passwordCrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

exports.comparePassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

exports.validationShema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
});
