import sessionModel from "../models/session.model.js";

/**
 *
 * @param {refreshToken, userId} param0 require these two params
 * @returns newly created session
 */
export const createSession = async ({ refreshToken, userId }) => {
  return await sessionModel.create({ user: userId, refreshToken });
};

/**
 *
 * @param {userId} userId require userId only
 * @returns found session
 */
export const getSessionByUserId = async (userId) => {
  const session = await sessionModel.findOne({ user: userId });
  return session;
};

/**
 *
 * @param {userId, refreshToken} param0 require these two params
 * @returns updated session document
 */
export const updateSessionByUserId = async ({ userId, refreshToken }) => {
  let session = await sessionModel.findOneAndUpdate(
    { user: userId },
    { refreshToken },
    { returnDocument: "after" },
  );
  if (!session)
    session = await sessionModel.create({ user: userId, refreshToken });
    
  return session;
};

/**
 * delete session using user id
 * @param {userId} userId require userId
 * @returns deleted document or empty
 */
export const deleteSessionByUserId = async (userId) => {
  return await sessionModel.deleteOne({ user: userId });
};
