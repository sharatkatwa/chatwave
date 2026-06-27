import { config, parse } from "dotenv";
config();
import z from "zod";
import appConstants from "../constants/app.constants.js";
import logger from "./logger.js";

const envSchema = z.object({
  MONGO_URI: z.string().nonempty(),
  PORT: z.coerce.number().default(3000),
  LOGGER_LEVEL: z.string().default(appConstants.LOGGER_LEVEL),
  NODE_ENV: z.string().default(appConstants.NODE_ENV),
  ACCESS_SECRET: z.string(),
  REFRESH_SECRET: z.string()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error({ ENV_ERROR: parsed.error.format() });
  process.exit(1);
}

export default parsed.data;
