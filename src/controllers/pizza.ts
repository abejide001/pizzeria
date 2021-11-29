
import { Response } from "express";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../utils/appResponse";
import Pizza from "../models/Pizza";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return created pizza
 */

const createPizzaType = async (req: any, res: Response) => {
  try {
    const { price, name, quantity } = req.body;
    const pizza = Pizza.build({
      name,
      price,
      userId: req.user.id,
      quantity
    });
    await pizza.save();
    sendSuccessResponse(res, 201, "Pizza type created successfully", pizza);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default createPizzaType;