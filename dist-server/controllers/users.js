"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUsers = () => {
  return _User.default.find();
};

var findUserById = data => {
  var {
    userId
  } = data;

  if (!userId) {
    throw "some info is missing";
  }

  return _User.default.findById(userId);
};

var createUser = data => {
  var {
    firstName,
    lastName,
    email,
    phone,
    age
  } = data;

  if (!firstName || !lastName || !email || !phone || !age) {
    throw "some info is missing";
  }

  return _User.default.create({
    firstName,
    lastName,
    email,
    phone,
    age
  });
};

var removeUserById = data => {
  var {
    userId
  } = data;

  if (!userId) {
    throw "some info is missing";
  }

  return _User.default.findByIdAndRemove(userId);
};

var profileUpdate = data => {
  var {
    userId,
    field,
    value
  } = data;

  if (!userId) {
    throw "Missing user id";
  }

  if (!field) {
    throw "Missing key field";
  }

  if (!value) {
    throw "Missing value";
  }

  return _User.default.findByIdAndUpdate(userId, {
    $set: {
      [field]: value
    }
  }, {
    new: true
  });
};

var createFriendship = data => {
  var {
    userId,
    friendId
  } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return _User.default.findByIdAndUpdate(userId, {
    $addToSet: {
      friends: friendId
    }
  }, {
    new: true
  });
};

var createFriendshipByF = data => {
  var {
    userId,
    friendId
  } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return _User.default.findByIdAndUpdate(friendId, {
    $addToSet: {
      friends: userId
    }
  }, {
    new: true
  });
};

var removeFriendship = data => {
  var {
    userId,
    friendId
  } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return _User.default.findByIdAndUpdate(userId, {
    $pull: {
      friends: friendId
    }
  }, {
    new: true
  });
};

var removeFriendshipByF = data => {
  var {
    userId,
    friendId
  } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return _User.default.findByIdAndUpdate(friendId, {
    $pull: {
      friends: userId
    }
  }, {
    new: true
  });
};

var findFriendsByUserId = data => {
  var {
    userId,
    page
  } = data;
  if (!userId || !page) throw "Missing user id";
  return _User.default.findById(userId).populate("friends");
};

var findStrangersByUserId = data => {
  var {
    userId,
    page
  } = data;
  if (!userId || !page) throw "Missing user id";
  return _User.default.find({
    friends: {
      $nin: [userId]
    },
    _id: {
      $ne: userId
    }
  });
};

var UserController = {
  getAllUsers,
  findUserById,
  createUser,
  removeUserById,
  profileUpdate,
  createFriendship,
  createFriendshipByF,
  removeFriendship,
  removeFriendshipByF,
  findFriendsByUserId,
  findStrangersByUserId
};
var _default = UserController;
exports.default = _default;