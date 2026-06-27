import mongoose from "mongoose";
import env from './envConfig.js'
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("DB connected -><-");
  } catch (error) {
    throw new Error("error connecting DB", error);
  }
};

export default connectDB