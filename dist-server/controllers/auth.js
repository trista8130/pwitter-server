"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var jwtSecret = process.env.JWT_SECRET;

var verifyToken = token => _jsonwebtoken.default.verify(token, jwtSecret);

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (data) {
    var {
      phone,
      password
    } = data;
    var user = yield _User.default.findOne({
      phone
    });

    if (!user) {
      throw "phone not match";
    }

    var isPasswordMatch = _bcryptjs.default.compareSync(password, user.password);

    if (!isPasswordMatch) {
      throw "password not match";
    }

    return _jsonwebtoken.default.sign({
      userId: user._id
    }, jwtSecret); //return token
  });

  return function handleLogin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (data) {
    var {
      phone,
      email,
      password,
      firstName,
      lastName,
      avatar
    } = data;
    var duplicatePhone = yield _User.default.findOne({
      phone
    });
    var duplicateEmail = yield _User.default.findOne({
      email
    });

    if (duplicatePhone) {
      throw "phone is taken";
    }

    if (duplicateEmail) {
      throw "email is taken";
    }

    var hanshedPassword = _bcryptjs.default.hashSync(password);

    return _User.default.create({
      firstName,
      lastName,
      phone,
      email,
      password: hanshedPassword,
      avatar
    });
  });

  return function register(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var AuthController = {
  handleLogin,
  register,
  verifyToken
};
var _default = AuthController;
exports.default = _default;