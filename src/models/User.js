import mongoose from "mongoose";
import bcrypt from "bcrypt";

// 스키마
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

// 비밀번호 저장 bcrypt
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// 모델
const User = mongoose.model("User", userSchema);
export default User;
