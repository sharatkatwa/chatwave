import jwt from "jsonwebtoken";
import env from "../config/envConfig.js";
const generateAccessToken = ({ username, email, id }) =>
  jwt.sign({ username, email, id }, env.ACCESS_SECRET, { expiresIn: "15m" });

const generateRefreshToken = ({ id }) =>
  jwt.sign({ id }, env.REFRESH_SECRET, { expiresIn: "7d" });
