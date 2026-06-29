import userModel from "../models/user.model.js";
import { AppError } from "../shared/custom.error.js";

export const findAllUsers = async () => {
  return await userModel.find().select("-password");
};

export const createUser = async ({ username, password, email }) => {
  return await userModel.create({ username, password, email }).select("-password");
};

export const findByEmailOrUsername = async ({ email, username }) => {
  const user = await userModel.findOne({ $or: [{ email }, { username }] });
  return user
};

export const findByUserId = async (userId) => {
  const user = await userModel.findById(userId).select("-password");
  return user;
};


