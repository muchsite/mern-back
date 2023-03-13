import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Pleas enter email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Pleas enter password"],
  },
});
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userID: this._id, mail: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFE,
    }
  );
};
UserSchema.methods.compearPasswords = async function (password1) {
  return await bcrypt.compare(password1, this.password);
};

export default mongoose.model("Users", UserSchema);
