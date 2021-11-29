import express from "express";
import { signin, signup } from "../controllers/auth";
import { authSchema } from "../middlewares/schema";
import validateRequestBody from "../middlewares/validateRequestBody";

const authRouter = express.Router();

authRouter.post("/signin", validateRequestBody(authSchema), signin);
authRouter.post("/signup", validateRequestBody(authSchema), signup);


export default authRouter
