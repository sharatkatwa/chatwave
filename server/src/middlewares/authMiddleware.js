import { AppError } from "../shared/custom.error";
import { verifyAccessToken } from "../utils/auth.utils";


/**
 * 
 * @param {headers['authorization']} req need authorization header
 * @param {null} res null
 * @param {null} next sent by the express to send the res to next user
 */
export const authMiddleware = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  if (!accessToken) throw new AppError("access token is missing", 401);
  try {
    const decoded = verifyAccessToken(accessToken);
    req.userId = decoded.id;
    next();
  } catch (error) {
    throw new AppError("unauthorized access", 401);
  }
};
