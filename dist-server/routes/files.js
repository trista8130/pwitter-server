"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _User = _interopRequireDefault(require("../models/User"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var s3 = new _awsSdk.default.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "us-east-1"
});
var upload = (0, _multer.default)({
  storage: (0, _multerS.default)({
    s3,
    bucket: "pwitter-images",
    key: function key(req, file, callback) {
      var uniqueName = Date.now() + "-" + Math.round(Math.random() * 100000);
      callback(null, "".concat(uniqueName, ".").concat(file.mimetype.split("/")[1]));
    }
  })
}); //上传进本地
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, __dirname + "../../../avatar/");
//   },
//   filename: function (req, file, callback) {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 100000);
//     callback(null, `${uniqueName}.${file.mimetype.split("/")[1]}`);
//   },
// });

var router = _express.default.Router();

router.post("/images", upload.single("files"),
/*#__PURE__*/
// multer({ storage, limits: { fileSize: 5000 } }).single("avatar"), 本地上传
function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var {
      userId
    } = req.query; // console.log(req.file.filename);

    try {
      // const user = await Users.findByIdAndUpdate(
      //   userId,
      //   {
      //     $set: {
      //       avatar: req.file.location,
      //     },
      //   },
      //   { new: true }
      // );
      // res.json({
      //   successs: true,
      //   data: user,
      // });
      res.json({
        success: true,
        data: req.file.location
      });
    } catch (error) {
      res.json({
        success: false,
        data: error
      });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;