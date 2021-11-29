import express from "express";
import createPizzaType from "../controllers/pizza";
import onlyAdminRoute from "../middlewares/onlyAdminRoute";
import requireAuth from "../middlewares/requireAuth";
import { pizzaSchema } from "../middlewares/schema";
import validateRequestBody from "../middlewares/validateRequestBody";

const pizzaRouter = express.Router();

pizzaRouter.post("/", requireAuth, onlyAdminRoute, validateRequestBody(pizzaSchema), createPizzaType);


export default pizzaRouter