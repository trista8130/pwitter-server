import Posts from "../models/Post";
import paginate from "../helpers/paginate";
import Users from "../models/User";
import UserController from "./users";

const getAllPosts = () => {
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
  return Posts.find().sort({ _id: -1 });
};

const createPost = (data) => {
  const { text, mood, authorId } = data;
  if (!mood) {
    throw "Missing mood";
  }
  if (!text) {
    throw "Missing text";
  }
  if (!authorId) {
    throw "Missing authorId";
  }
  return Posts.create({
    text,
    mood,
    authorId,
  });
};

const findPostById = (data) => {
  const { postId } = data;
  if (!postId) {
    throw "Missing post id";
  }
  return Posts.findById(postId);
};

const findPostByUser = (data) => {
  const { userId,page } = data;
  if (!userId) {
    throw "Missing author id";
  }
  if (!page) {
    throw "Missing page";
  }

  return Posts.find({
    authorId: { $eq: userId },
  }).sort({ _id: -1 });
};

const findPostByFriends = async (data) => {
    const { userId, page } = data;
    const user = await Users.findById(userId);
    const friends = user.friends;
    friends.push(userId);

    if (!userId) {
      throw "Missing post id";
    }
    if (!page) {
      throw "Missing post page";
    }
    if (!friends) {
      throw "You dont have friends";
    }
    return Posts.find({
      authorId: { $in: friends },
    }).sort({ _id: -1 });
  };
  // const { authorId } = data;
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


const createCommentInAPost = (data) => {
  const { postId, authorId, text } = data;
  if (!postId) {
    throw "Missing post id";
  }
  if (!authorId) {
    throw "Missing commentAuthor id";
  }
  if (!text) {
    throw "Missing comment text";
  }
  return Posts.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: { text: text, authorId: authorId },
      },
    },
    {
      new: true,
    }
  );
};

const likeAComment = async (data) => {
  const { postId, commentIndex, authorId } = data;

  //   return Posts.updateMany(
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

  const { comments } = await Posts.findById(postId);
  const currentComments = comments[commentIndex];
  const currentLikes = currentComments.likes || [];

  if (!postId) {
    throw "Missing post id";
  } else if (!commentIndex) {
    throw "Missing commentIndex";
  } else if (!authorId) {
    throw "Missing likeAuthor id";
  } else if (currentLikes.includes(authorId)) {
    throw "You have already liked this comment";
  } else {
    const nextComments = {
      ...currentComments,
      likes: [...currentLikes, authorId],
    };
    comments[commentIndex] = nextComments;
    return Posts.findByIdAndUpdate(
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
};

const unLikeAComment = async (data) => {
  const { postId, commentIndex, authorId } = data;
  const { comments } = await Posts.findById(postId);
  const currentComments = comments[commentIndex];
  const currentLikes = currentComments.likes || [];

  if (!postId) {
    throw "Missing post id";
  } else if (!commentIndex) {
    throw "Missing commentAuthorId";
  } else if (!authorId) {
    throw "Missing likeAuthor id";
  } else if (!currentLikes.includes(authorId)) {
    throw "You have not liked this comment";
  } else {
    const nextlikes = currentLikes.filter((likes) => likes !== authorId);
    comments[commentIndex].likes = nextlikes;
    return Posts.findByIdAndUpdate(
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
};

const likeAPost = (data) => {
  const { postId, authorId } = data;
  if (!postId) {
    throw "Missing post id";
  }
  if (!authorId) {
    throw "Missing who like the post";
  }
  return Posts.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        likes: authorId,
      },
    },
    { new: true }
  );
};
const unLikeAPost = (data) => {
  const { postId, authorId } = data;
  if (!postId) {
    throw "Missing post id";
  }
  if (!authorId) {
    throw "Missing who unlike the post";
  }
  return Posts.findByIdAndUpdate(
    postId,
    {
      $pull: {
        likes: authorId,
      },
    },
    { new: true }
  );
};
const reportAPost = (data) => {
  const { postId, authorId } = data;
  if (!postId) {
    throw "Missing post id";
  }
  if (!authorId) {
    throw "Missing who report the post";
  }
  return Posts.findByIdAndUpdate(
    postId,
    {
      $addToSet: {
        reports: authorId,
      },
    },
    { new: true }
  );
};
const unReportAPost = (data) => {
  const { postId, authorId } = data;
  if (!postId) {
    throw "Missing post id";
  }
  if (!authorId) {
    throw "Missing who unreport the post";
  }
  return Posts.findByIdAndUpdate(
    postId,
    {
      $pull: {
        reports: authorId,
      },
    },
    { new: true }
  );
};

const PostController = {
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

export default PostController;
