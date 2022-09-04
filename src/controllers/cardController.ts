import { Request, Response } from "express";
import { activateCardService } from "../services/activateCardService";
import { createCardService } from "../services/createCardService";
import { viewBalanceService } from "../services/viewBalanceService";
import { blockCardService } from "../services/blockCardService";
import { unlockCardService } from "../services/unlockCardService";

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

  response.status(500).send();
}

export async function activateCard(request: Request, response: Response) {
  const card: object = response.locals.infoCard;
  const infoAddCard: object = request.body;

  const success = await activateCardService(card, infoAddCard);

  if (success === "success") {
    return response.status(200).send("Cartão ativado com sucesso");
  }

  response.status(500).send();
}

export async function viewBalance(request: Request, response: Response) {
  const card: object = response.locals.infoCard;

  const result = await viewBalanceService(card);

  if (result) {
		return response.status(200).send(result);
	}

  response.status(200).send();
}

export async function blockCard(request: Request, response: Response) {
  const card: object = response.locals.infoCard;

  const password = request.body;

  const success = await blockCardService(card, password);

  if (success === "success") {
    return response.status(200).send("Cartão bloqueado com sucesso");
  }

  response.status(500).send();
}

export async function unlockCard(request: Request, response: Response) {
  const card: object = response.locals.infoCard;

  const password = request.body;

  const success = await unlockCardService(card, password);

  if (success === "success") {
    return response.status(200).send("Cartão desbloqueado com sucesso");
  }

  response.status(500).send();
}
