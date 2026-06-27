import { config } from "dotenv";
import pino from "pino";
import appConstants from "../constants/app.constants.js";

config();

const logger = pino({
  level: process.env.LOGGER_LEVEL || appConstants.LOGGER_LEVEL,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

export default logger
