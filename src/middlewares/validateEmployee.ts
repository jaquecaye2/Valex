import { Request, Response, NextFunction } from "express";
import { findById } from "../repositories/employeeRepository";

export async function validateEmployee(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const idEmployees: any = request.params.id;

  const findEmployee = await findById(idEmployees);

  if (!findEmployee) {
    throw { code: "NotFound", message: "Empregado não encontrado" };
  }

  response.locals.infoEmployee = findEmployee;

  next();
}
