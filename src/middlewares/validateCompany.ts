import { Request, Response, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository";

export async function validateCompany(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apikey: any = request.headers.apikey;

  const findApiKey = await findByApiKey(apikey);

  if (!findApiKey) {
    throw { code: "Unauthorized", message: "Chave da companhia inválida" };
  }

  response.locals.infoCompany = findApiKey

  next();
}
