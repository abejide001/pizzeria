const Joi = require("joi");

export const authSchema = Joi.object({
  email: Joi.string().required().strict().messages({
    "string.base": "email must be a string",
    "string.empty": "email field is required",
    "any.required": "email field is required",
  }),
  password: Joi.string().min(4).required().strict().messages({
    "string.base": "password must be a string",
    "string.empty": "password field is required",
    "any.required": "password field is required",
  }),
});

export const pizzaSchema = Joi.object({
  price: Joi.number().min(1).required().strict().messages({
    "number.base": "price must be a number",
    "number.empty": "price field is required",
    "any.required": "price field is required",
  }),
  name: Joi.string().trim().required().strict().messages({
    "string.base": "name must be a string",
    "string.empty": "name field is required",
    "any.required": "name field is required",
  }),
  quantity: Joi.number().min(1).required().strict().messages({
    "number.base": "quantity must be a number",
    "number.empty": "quantity field is required",
    "any.required": "quantity field is required",
  }),
});

export const orderSchema = Joi.object({
  items: Joi.array().items(Joi.string().length(24)).required().strict().messages({
    "string.base": "items must be a string",
    "string.empty": "items field is required",
    "any.required": "items field is required",
  }),
});