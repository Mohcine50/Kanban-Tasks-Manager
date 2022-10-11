const {
  passwordCrypt,
  validationShema,
  comparePassword,
} = require("../utils/utils");
const User = require("../Models/User");
const JWT = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const { error } = validationShema.validate(req.body);

  if (error) {
    return res.json({ message: "check your email or password" });
  }

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    return res.json({ message: "email already existed" });
  }

  const hashedPassword = await passwordCrypt(password);
  const user = new User({ name: name, email: email, password: hashedPassword });
  try {
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.json({ message: "Cannot register Please try later" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "No user associated with this email" });
  }

  const result = await comparePassword(password, user.password);
  if (!result) {
    return res.status(400).send("Wrong passowrd");
  }

  const token = JWT.sign({ _id: user._id }, process.env.SECRET_TOKEN_PHRASE);
  return res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({ user, token });
};

exports.logOut = async (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out" });
};
