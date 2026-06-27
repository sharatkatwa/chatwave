import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      unique: true,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

sessionSchema.pre("save", function () {
  if (this.isModified("refreshToken"))
    this.refreshToken = bcrypt.hashSync(this.refreshToken, 10);
});

sessionSchema.methods.compareRefreshToken = function (refreshToken) {
  return bcrypt.compare(refreshToken, this.refreshToken);
};

const Session = mongoose.model("Session", sessionSchema);
export default Session
