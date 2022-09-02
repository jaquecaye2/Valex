import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export function validateSchema(schema: Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const validation = schema.validate(request.body);
    if (validation.error) {
      return response.sendStatus(422);
    }

    next();
  };
}
