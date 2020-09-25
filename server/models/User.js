import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  friends: [String],
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  age: Number,
  avatar: String,
  password: String,
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
