import { Request, Response, NextFunction } from "express";
import { findById } from "../repositories/cardRepository";

export async function validateCard(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const id: number = Number(request.params.id);

  const findCard = await findById(id);

  if (!findCard) {
    throw { code: "Unauthorized", message: "Cartão não encontrado" };
  }

  response.locals.infoCard = findCard

  next();
}
