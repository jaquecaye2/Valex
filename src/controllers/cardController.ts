import { Request, Response } from "express";
import { activateCardService } from "../services/activateCardService";
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

export async function activateCard(request: Request, response: Response) {
  const card: object = response.locals.infoCard;
  const infoAddCard: object = request.body

  const success = await activateCardService(card, infoAddCard);

  /*if (success === "success") {
		return response.status(200).send("Cartão criado com sucesso");
	}

  response.status(500).send()*/

  response.status(200).send("Cartão ativado com sucesso")
}
