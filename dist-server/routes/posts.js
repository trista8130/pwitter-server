"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _posts = _interopRequireDefault(require("../controllers/posts"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express.default.Router();
/* GET users listing. */


router.get("/fetch", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.getAllPosts(req.query);
      res.json({
        success: true,
        data: result,
        total: result.length
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/create", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.createPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get("/find/byId", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.findPostById(req.query);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get("/find/byUser", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var {
      page
    } = req.query;

    try {
      var result = yield _posts.default.findPostByUser(req.query);
      var newResult = (0, _paginate.default)(result, page);
      res.json({
        success: true,
        data: newResult
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/find/byFriends", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        page
      } = req.query;
      var result = yield _posts.default.findPostByFriends(req.query);
      var newResult = (0, _paginate.default)(result, page);
      res.json({
        success: true,
        data: newResult
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.post("/comment/create", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.createCommentInAPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
router.delete("/delete", /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    var {
      postId
    } = req.body;

    try {
      var result = yield _Post.default.findByIdAndDelete(postId);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
router.post("/comment/like", /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.likeAComment(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
router.post("/comment/unlike", /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.unLikeAComment(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
router.post("/like", /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.likeAPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
router.post("/unlike", /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.unLikeAPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
router.post("/report", /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.reportAPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
router.post("/unreport", /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(function* (req, res) {
    try {
      var result = yield _posts.default.unReportAPost(req.body);
      res.json({
        success: true,
        data: result
      });
    } catch (e) {
      res.json({
        success: false,
        data: e
      });
    }
  });

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;