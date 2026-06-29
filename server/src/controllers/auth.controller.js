import * as userDao from "../dao/user.dao.js";
import * as sessionDao from "../dao/session.dao.js";
import * as authUtils from "../utils/auth.utils.js";
import UserModel from "../models/user.model.js";
import { AppError } from "../shared/custom.error.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import sendResponse from "../utils/successResponse.utils.js";
import { app_config } from "../constants/app.constants.js";

/**
 * @params username, email, password
 * @returns - new user with loggedin
 */
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

  // generate refresh token using uttils function
  const refreshToken = await authUtils.generateRefreshToken(newUser._id);

  // Creates refresh token session using session dao
  await sessionDao.createSession({ refreshToken, userId: newUser._id });

  // set cookie to the client side
  res.cookie("refreshToken", refreshToken, app_config().RefreshcookieOptions);

  return sendResponse(res, 201, "user created successfully", {
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    accessToken,
  });
});

/**
 * Login controller
 * @params email,  password
 * @returns - logged in user
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userDao.findByEmailOrUsername({ email });

  if (!user) throw new AppError("Invalid email or password", 400);

  const isValidPassword = user.comparePassword(password);
  if (!isValidPassword) throw new AppError("Invalid email or password", 400);

  const refreshToken = authUtils.generateRefreshToken(user._id);
  const accessToken = authUtils.generateAccessToken({
    username: user.username,
    email: user.email,
    id: user._id,
  });

  // update existing session if not create it
  await sessionDao.updateSessionByUserId({ userId: user._id, refreshToken });

  res.cookie("refreshToken", refreshToken, app_config().RefreshcookieOptions);

  return sendResponse(res, 200, "Login successfully", {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
});

/**
 * Logout user from session and delete that session
 * @params none
 * @return none
 */
export const logoutUser = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const decoded = authUtils.verifyRefreshToken(refreshToken);
  await sessionDao.deleteSessionByUserId(decoded.id);

  res.clearCookie("refreshToken", app_config().RefreshcookieOptions);

  return sendResponse(res, 200, "Logout Successful");
});

/**
 * @params refreshTokne
 * @returns rotate refresh and accesToken
 */

export const refreshUserAccess = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new AppError("refresh token not found", 404);

  // verify and decode the refresh token
  const decoded = authUtils.verifyRefreshToken(refreshToken);

  // check if the session is available with the id or not
  const session = await sessionDao.getSessionByUserId(decoded.id);
  if (!session) throw new AppError("Invalid refresh token", 400);

  // compare session refresh token with cookie token
  const isValidRefreshToken = session.compareRefreshToken(refreshToken);
  if (!isValidRefreshToken) throw new AppError("invalid refresh token", 400);

  const user = userDao.findByUserId(decoded.id);
  // generate new access and refresh token
  const newRefreshToken = authUtils.generateRefreshToken(decoded.id);
  const newAccessToken = authUtils.generateAccessToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  // update session
  await sessionDao.updateSessionByUserId({
    userId: decoded.id,
    refreshToken: newRefreshToken,
  });

  // SET COOKIE
  res.cookie(
    "refreshToken",
    newRefreshToken,
    app_config().RefreshcookieOptions,
  );

  // send response
  sendResponse(res, 200, "token refresh successfully", {
    accessToken: newAccessToken,
  });
});


/**
 * getme controller
 * @params -req.usreId
 * @returns - logged in user data
 * 
 */
export const getMe = asyncHandler(async (req, res) => {
  const userId = req.userId;

  if (!userId) throw new AppError("Id not found ", 400);

  const user = userDao.findByUserId(userId);
  if (!user) throw new AppError("user not found", 404);

  sendResponse(res, 200, "user data retrieved successfully", {
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
});
