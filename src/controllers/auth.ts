import { Password } from "../utils/Password";
import { Request, Response } from "express";
import User from "../models/User";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../utils/appResponse";
import jwtSign from "../utils/token";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return success message and logged in user
 */
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("-__v");
    if (!user) {
      sendFailureResponse(res, 401, "Incorrect email or password");
      return;
    }

    const passwordMatch = await Password.compare(user.password, password);

    if (!passwordMatch) {
      sendFailureResponse(res, 401, "Incorrect email or password");
      return;
    }
    const token = jwtSign({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    sendSuccessResponse(res, 200, "User logged in successfully", {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};


/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return registered user
 */

 export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select("-__v")
    if (existingUser) {
      sendFailureResponse(res, 409, "Email already exist");
      return;
    }
    const user = User.build({
      email,
      password,
    });
    await user.save();
    const token = jwtSign(user);
    sendSuccessResponse(res, 201, "User registered successfully", {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};