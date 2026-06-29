import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required:true,
      trim: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function () {
  if (this.isModified("password"))
    this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
