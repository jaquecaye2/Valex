import { Request, Response } from "express";
import { createCardService } from "../services/createCardService";

export async function createCard(request: Request, response: Response) {
  const company: object = response.locals.infoCompany;
  const employee: object = response.locals.infoEmployee;
  const type: string = request.params.type;

  if (
    type !== "groceries" &&
    type !== "restaurant" &&
    type !== "transport" &&
    type !== "education" &&
    type !== "health"
  ) {
    throw {
      code: "Unauthorized",
      message: "Tipo do cartão informado é inválido",
    };
  }

  const success = await createCardService(company, employee, type);

  if (success === "success") {
		return response.status(200).send("Cartão criado com sucesso");
	}

  response.status(500).send()
}
