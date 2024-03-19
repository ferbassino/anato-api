const User = require("../models/userModel");
const VerificationToken = require("../models/verificationToken");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const { sendError } = require("../helper/errors");
exports.createUser = async (request, response) => {
  console.log("aver si entra a create");
  const { userName, email, password } = request.body;
  const userEmail = await User.findOne({ email });

  if (userEmail)
    return response.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });

  const passwordHash = await bcrypt.hash(password, 8);

  const user = await User({
    userName,
    email,
    password: passwordHash,
  });

  await user.save();

  response.json({
    success: true,
    user: user,
  });
};

exports.signIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email.trim() || !password.trim())
      return sendError(response, "email / password missing");

    const user = await User.findOne({ email });

    if (!user)
      return response.json({
        success: false,
        message: "user not found, whit the given email",
      });

    // compare Password

    const isMatch = await bcrypt.compare(password, user.password);

    // ------------

    // const isMatch = await UserSchema.comparePassword(password);
    if (!isMatch)
      return response.json({
        success: false,
        message: "password does not match",
      });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    response.json({
      success: true,
      user: { token, user },
    });
  } catch (error) {
    sendError(response, error.message, 500);
  }
};

exports.getProfile = (request, response) => {
  if (!request.user)
    return response.json({ success: false, message: "unauthorized access" });

  response.json({
    success: true,
    userName: request.user.userName,
    email: request.user.email,
    id: request.user._id,
    verified: request.user.verified,
    roles: request.user.roles,
  });
};
