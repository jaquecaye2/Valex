import { insert } from "../repositories/rechargeRepository";

export async function rechargeCardService(card: any, amount: any) {
  const expirationDate = Date.parse(`01/${card.expirationDate}`);
  const dayAtual = Date.now();

  if (dayAtual > expirationDate) {
    throw {
      code: "Unauthorized",
      message: "Cartão expirado",
    };
  }

  if (card.isBlocked === true) {
    throw {
      code: "Unauthorized",
      message: "Cartão esta bloqueado",
    };
  }

  const rechargeData = {
    cardId: card.id,
    amount: Number(amount.amount),
  };

  await insert(rechargeData);

  return "success";
}
