import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
export const generateAccessToken = ({ username, email, id }) => {
  return jwt.sign({ username, email, id }, env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
};
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, env.REFRESH_SECRET, { expiresIn: "7d" });
};
export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.REFRESH_SECRET);

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.ACCESS_SECRET);
