import { Request, Response } from "express";
import { rechargeCardService } from "../services/rechargeCardService";

export async function rechargeCard(request: Request, response: Response){
    const card: object = response.locals.infoCard;

    const amount = request.body
  
    const success = await rechargeCardService(card, amount);
  
    if (success === "success") {
      return response.status(200).send("Cartão recarregado com sucesso");
    }
  
    response.status(500).send();
}