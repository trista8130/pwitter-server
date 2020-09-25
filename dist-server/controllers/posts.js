'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _Post = _interopRequireDefault(require('../models/Post'));

var _paginate = _interopRequireDefault(require('../helpers/paginate'));

var _User = _interopRequireDefault(require('../models/User'));

var _users = _interopRequireDefault(require('./users'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

var getAllPosts = () => {
  // return Posts.aggregate([
  //   {
  //     $lookup: {
  //       let: { authorObjId: { $toObjectId: "$authorId" } },
  //       from: "users",
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $eq: ["$_id", "$$authorObjId"] },
  //           },
  //         },
  //         {
  //           $project: {
  //             firstName: 1,
  //             lastName: 1,
  //             avatar: 1,
  //           },
  //         },
  //       ],
  //       as: "author",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       authorObjId: {
  //         $map: {
  //           input: "$likes",
  //           as: "likeAuthor",
  //           in: { $toObjectId: "$$likeAuthor" },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "authorObjId",
  //       foreignField: "_id",
  //       as: "likeAuthor",
  //     },
  //   },
  // ]).sort({ _id: -1 });
  return _Post.default.find().sort({
    _id: -1,
  });
};

var createPost = (data) => {
  var { text, mood, authorId } = data;

  if (!mood) {
    throw 'Missing mood';
  }

  if (!text) {
    throw 'Missing text';
  }

  if (!authorId) {
    throw 'Missing authorId';
  }

  return _Post.default.create({
    text,
    mood,
    authorId,
  });
};

var findPostById = (data) => {
  var { postId } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  return _Post.default.findById(postId);
};

var findPostByUser = (data) => {
  var { userId, page } = data;

  if (!userId) {
    throw 'Missing author id';
  }

  if (!page) {
    throw 'Missing page';
  }

  return _Post.default
    .find({
      authorId: {
        $eq: userId,
      },
    })
    .sort({
      _id: -1,
    });
};

var findPostByFriends = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(function* (data) {
    var { userId, page } = data;
    var user = yield _User.default.findById(userId);
    var friends = user.friends;
    friends.push(userId);

    if (!userId) {
      throw 'Missing post id';
    }

    if (!page) {
      throw 'Missing post page';
    }

    if (!friends) {
      throw 'You dont have friends';
    }

    return _Post.default
      .find({
        authorId: {
          $in: friends,
        },
      })
      .sort({
        _id: -1,
      });
  });

  return function findPostByFriends(_x) {
    return _ref.apply(this, arguments);
  };
})(); // const { authorId } = data;
// return Users.aggregate([
//   {
//     $addFields: { userId: { $toString: "$_id" } },
//   },
//   {
//     $match: { userId: authorId },
//   },
//   {
//     $lookup: {
//       from: "posts",
//       localField: "friends",
//       foreignField: "authorId",
//       as: "friendsposts",
//     },
//   },
// ]);

var createCommentInAPost = (data) => {
  var { postId, authorId, text } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  if (!authorId) {
    throw 'Missing commentAuthor id';
  }

  if (!text) {
    throw 'Missing comment text';
  }

  return _Post.default.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: {
          text: text,
          authorId: authorId,
        },
      },
    },
    {
      new: true,
    }
  );
};

var likeAComment = /*#__PURE__*/ (function () {
  var _ref2 = _asyncToGenerator(function* (data) {
    var { postId, commentIndex, authorId } = data; //   return Posts.updateMany(
    //     { _id: postId },
    //     { comments: { $position: commentIndex } },
    //     { $push: { "likes": [authorId] } }
    //   );
    // };
    //   return Posts.findByIdAndUpdate(
    //     postId,
    //     {
    //       comments: {
    //         $position: commentIndex,
    //         $set: { likes: [authorId] },
    //       },
    //     },
    //     { new: true }
    //   );
    // };

    var { comments } = yield _Post.default.findById(postId);
    var currentComments = comments[commentIndex];
    var currentLikes = currentComments.likes || [];

    if (!postId) {
      throw 'Missing post id';
    } else if (!commentIndex) {
      throw 'Missing commentIndex';
    } else if (!authorId) {
      throw 'Missing likeAuthor id';
    } else if (currentLikes.includes(authorId)) {
      throw 'You have already liked this comment';
    } else {
      var nextComments = _objectSpread(
        _objectSpread({}, currentComments),
        {},
        {
          likes: [...currentLikes, authorId],
        }
      );

      comments[commentIndex] = nextComments;
      return _Post.default.findByIdAndUpdate(
        postId,
        {
          $set: {
            comments,
          },
        },
        {
          new: true,
        }
      );
    }
  });

  return function likeAComment(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var unLikeAComment = /*#__PURE__*/ (function () {
  var _ref3 = _asyncToGenerator(function* (data) {
    var { postId, commentIndex, authorId } = data;
    var { comments } = yield _Post.default.findById(postId);
    var currentComments = comments[commentIndex];
    var currentLikes = currentComments.likes || [];

    if (!postId) {
      throw 'Missing post id';
    } else if (!commentIndex) {
      throw 'Missing commentAuthorId';
    } else if (!authorId) {
      throw 'Missing likeAuthor id';
    } else if (!currentLikes.includes(authorId)) {
      throw 'You have not liked this comment';
    } else {
      var nextlikes = currentLikes.filter((likes) => likes !== authorId);
      comments[commentIndex].likes = nextlikes;
      return _Post.default.findByIdAndUpdate(
        postId,
        {
          $set: {
            comments,
          },
        },
        {
          new: true,
        }
      );
    }
  });

  return function unLikeAComment(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

var likeAPost = (data) => {
  var { postId, authorId } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  if (!authorId) {
    throw 'Missing who like the post';
  }

  return _Post.default.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        likes: authorId,
      },
    },
    {
      new: true,
    }
  );
};

var unLikeAPost = (data) => {
  var { postId, authorId } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  if (!authorId) {
    throw 'Missing who unlike the post';
  }

  return _Post.default.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likes: authorId,
      },
    },
    {
      new: true,
    }
  );
};

var reportAPost = (data) => {
  var { postId, authorId } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  if (!authorId) {
    throw 'Missing who report the post';
  }

  return _Post.default.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        reports: authorId,
      },
    },
    {
      new: true,
    }
  );
};

var unReportAPost = (data) => {
  var { postId, authorId } = data;

  if (!postId) {
    throw 'Missing post id';
  }

  if (!authorId) {
    throw 'Missing who unreport the post';
  }

  return _Post.default.findByIdAndUpdate(
    postId,
    {
      $pull: {
        reports: authorId,
      },
    },
    {
      new: true,
    }
  );
};

var PostController = {
  getAllPosts,
  createPost,
  findPostById,
  findPostByUser,
  findPostByFriends,
  createCommentInAPost,
  likeAComment,
  unLikeAComment,
  likeAPost,
  unLikeAPost,
  reportAPost,
  unReportAPost,
};
var _default = PostController;
exports.default = _default;
