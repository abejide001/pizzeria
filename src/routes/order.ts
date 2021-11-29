import express from "express";
import createOrder from "../controllers/order";
import requireAuth from "../middlewares/requireAuth";
import { orderSchema } from "../middlewares/schema";
import validateRequestBody from "../middlewares/validateRequestBody";

const orderROuter = express.Router();

orderROuter.post("/", requireAuth, validateRequestBody(orderSchema), createOrder);


export default orderROuter