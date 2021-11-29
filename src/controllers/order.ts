import { Response } from "express";
import { sendSuccessResponse, sendFailureResponse } from "../utils/appResponse";
import Order from "../models/Order";
import Pizza from "../models/Pizza";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return created order
 */

const createOrder = async (req: any, res: Response) => {
  try {
    const { items } = req.body;
    const order = Order.build({
      userId: req.user.id,
    });
    for (let i of items) {
      // check if pizza id is valid
      const pizza = await Pizza.findById({ _id: i });
      if (!pizza) {
        sendFailureResponse(res, 404, "Pizza not found");
        return
      }
      if (pizza.quantity < 1) {
        sendFailureResponse(res, 404, `${pizza} is currently not available`);
        return
      }
      order.items.push(i);
      await order.save();

      // update pizza quantity
    }
    sendSuccessResponse(res, 201, "Order created successfully", order);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default createOrder;
