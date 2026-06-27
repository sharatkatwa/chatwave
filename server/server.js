import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import env from "./src/config/envConfig.js";
import logger from "./src/config/logger.js";

const startServer = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info({ PORT: env.PORT }, "server is runnig on port ");
  });
};

startServer();
