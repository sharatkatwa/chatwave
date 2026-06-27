import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (req, res) =>
  res.json({ message: "api is in good condition." }),
);


export default app