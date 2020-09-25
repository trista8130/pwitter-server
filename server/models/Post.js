import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  likes: [String],
  comments: [Object],
  reports:[String],
  text: String,
  mood: String,
  authorId: String,
});

const Posts = mongoose.model("Posts", PostSchema);

export default Posts;
