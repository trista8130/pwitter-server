import Users from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (token) => jwt.verify(token, jwtSecret);

const handleLogin = async (data) => {
  const { phone, password } = data;
  const user = await Users.findOne({ phone });
  if (!user) {
    throw "phone not match";
  }
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw "password not match";
  }
  return jwt.sign({ userId: user._id }, jwtSecret);
  //return token
};

const register = async (data) => {
  const { phone, email, password, firstName, lastName, avatar } = data;
  const duplicatePhone = await Users.findOne({ phone });
  const duplicateEmail = await Users.findOne({ email });

  if (duplicatePhone) {
    throw "phone is taken";
  }
  if (duplicateEmail) {
    throw "email is taken";
  }
  const hanshedPassword = bcrypt.hashSync(password);
  return Users.create({
    firstName,
    lastName,
    phone,
    email,
    password: hanshedPassword,
    avatar,
  });
};

const AuthController = {
  handleLogin,
  register,
  verifyToken,
};

export default AuthController;
