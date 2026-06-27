import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import sendResponse from "./utils/successResponse.utils.js";
import indexRouter from "./routes/index.routes.js";

const app = express();

// -------------nessasary middleware initialization----------------------
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

//------------Routes initialization---------------------
app.get("/health", (req, res) =>
  sendResponse(res, 200, "api health is in good condition")
);

app.use('/api',indexRouter)

// -------------express global error handler-----------
app.use(errorHandler);

export default app;
