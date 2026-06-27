import * as userDao from "../dao/user.dao.js";
import * as sessionDao from "../dao/session.dao.js";
import * as authUtils from "../utils/auth.utils.js";
import UserModel from "../models/user.model.js";
import { AppError } from "../shared/custom.error.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import sendResponse from "../utils/successResponse.utils.js";
import { app_config } from "../constants/app.constants.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExists = await userDao.findByEmailOrUsername({ email, username });
  if (isUserExists) throw new AppError("Username or Email already exists", 400);

  const newUser = await userDao.createUser({ username, email, password });
  
  const accessToken = await authUtils.generateAccessToken({
    username: newUser.username,
    email: newUser.email,
    id: newUser._id,
  });
  
  const refreshToken = await authUtils.generateRefreshToken({
    id: newUser._id,
  });
  
  await sessionDao.createSession({ refreshToken, userId: newUser._id });
  res.cookie('refreshToken', refreshToken,app_config().RefreshcookieOptions)

  sendResponse(res, 201, "user created successfully", {
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    accessToken,
  });
});
