import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authValidator from "../validators/auth.validator.js";

const router = Router();

router.post("/register", authValidator.registerUserValidator, authController.register);

export default router;
