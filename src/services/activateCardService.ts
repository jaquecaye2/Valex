import Cryptr from "cryptr";
import { update } from "../repositories/cardRepository";

export async function activateCardService(card: any, infoAddCard: any) {
  const expirationDate = Date.parse(`01/${card.expirationDate}`);
  const dayAtual = Date.now();

  if (dayAtual > expirationDate) {
    throw {
      code: "Unauthorized",
      message: "Cartão expirado",
    };
  }

  if (card.isBlocked === false && card.password !== null) {
    throw {
      code: "Unauthorized",
      message: "Cartão já está ativado",
    };
  }
  const cvc: string = card.securityCode;

  const cryptr: any = new Cryptr("myTotallySecretKey");

  const decryptCvc: string = cryptr.decrypt(cvc);

  if (decryptCvc !== infoAddCard.cvc) {
    throw {
      code: "Unauthorized",
      message: "Código de segurança não confere",
    };
  }

  const password = Number(infoAddCard.password);

  if (isNaN(password)) {
    throw {
      code: "Unauthorized",
      message: "Senha deve ser composta por 4 números",
    };
  }

  const encryptPassword: string = cryptr.encrypt(password)

  const cardData = {
    password: encryptPassword,
    isBlocked: false
  }

  await update(card.id, cardData)

  return "success";
}
