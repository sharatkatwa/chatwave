import sessionModel from "../models/session.model.js";

export const createSession = async ({ refreshToken, userId }) => {
  return await sessionModel.create({ user: userId, refreshToken });
};

export const getSessionByUserId = async (userId) => {
  const session = await sessionModel.findOne({ user: userId });
  return session
};
