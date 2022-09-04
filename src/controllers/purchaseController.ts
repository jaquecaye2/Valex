import { Request, Response } from "express";
import { purchaseService } from "../services/purchaseCardService";
import { purchaseOnlineService } from "../services/purchaseOnlineCardService";

export async function purchase(request: Request, response: Response){
    const card: object = response.locals.infoCard;

    const infoPurchase = request.body
  
    const success = await purchaseService(card, infoPurchase);
  
    if (success === "success") {
      return response.status(200).send("Compra efetuada com sucesso");
    }
  
    response.status(500).send();
}

export async function purchaseOnline(request: Request, response: Response){
  const card: object = response.locals.infoCard;

  const infoPurchase = request.body

  const success = await purchaseOnlineService(card, infoPurchase);

  if (success === "success") {
    return response.status(200).send("Compra efetuada com sucesso");
  }

  response.status(500).send();
}