import { NextFunction, Response, Request } from "express";

const { sendFailureResponse } = require("../utils/appResponse");

const validateRequestBody = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorArray: any = [];
      error.details.map((result: any) => {
        errorArray.push({ [result.path]: result.message });
      });
      sendFailureResponse(res, 422, errorArray);
    } else {
      req.body = value;
      next();
    }
  };
};

export default validateRequestBody