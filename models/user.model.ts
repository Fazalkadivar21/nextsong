import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // ✅ use "username", not "name"
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
