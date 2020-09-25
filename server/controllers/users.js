import Users from "../models/User";
import paginate from "../helpers/paginate";

const getAllUsers = () => {
  return Users.find();
};

const findUserById = (data) => {
  const { userId } = data;
  if (!userId) {
    throw "some info is missing";
  }
  return Users.findById(userId);
};

const createUser = (data) => {
  const { firstName, lastName, email, phone, age } = data;
  if (!firstName || !lastName || !email || !phone || !age) {
    throw "some info is missing";
  }
  return Users.create({
    firstName,
    lastName,
    email,
    phone,
    age,
  });
};

const removeUserById = (data) => {
  const { userId } = data;
  if (!userId) {
    throw "some info is missing";
  }
  return Users.findByIdAndRemove(userId);
};

const profileUpdate = (data) => {
  const { userId, field, value } = data;
  if (!userId) {
    throw "Missing user id";
  }
  if (!field) {
    throw "Missing key field";
  }
  if (!value) {
    throw "Missing value";
  }
  return Users.findByIdAndUpdate(
    userId,
    {
      $set: {
        [field]: value,
      },
    },
    {
      new: true,
    }
  );
};

const createFriendship = (data) => {
  const { userId, friendId } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return Users.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        friends: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const createFriendshipByF = (data) => {
  const { userId, friendId } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return Users.findByIdAndUpdate(
    friendId,
    {
      $addToSet: {
        friends: userId,
      },
    },
    {
      new: true,
    }
  );
};

const removeFriendship = (data) => {
  const { userId, friendId } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return Users.findByIdAndUpdate(
    userId,
    {
      $pull: {
        friends: friendId,
      },
    },
    {
      new: true,
    }
  );
};

const removeFriendshipByF = (data) => {
  const { userId, friendId } = data;
  if (!userId) throw "Missing user id";
  if (!friendId) throw "Missing friend id";
  return Users.findByIdAndUpdate(
    friendId,
    {
      $pull: {
        friends: userId,
      },
    },
    {
      new: true,
    }
  );
};

const findFriendsByUserId = (data) => {
  const { userId, page } = data;
  if (!userId || !page) throw "Missing user id";

  return Users.findById(userId);
};

const findStrangersByUserId = (data) => {
  const { userId, page } = data;
  if (!userId || !page) throw "Missing user id";
  return Users.find({
    friends: {
      $nin: [userId],
    },
    _id: { $ne: userId },
  });
};

const UserController = {
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
  findStrangersByUserId,
};

export default UserController;
