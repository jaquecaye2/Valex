import Cryptr from "cryptr";
import { update } from "../repositories/cardRepository";

export async function unlockCardService(card: any, password: any) {
  const expirationDate = Date.parse(`01/${card.expirationDate}`);
  const dayAtual = Date.now();

  if (dayAtual > expirationDate) {
    throw {
      code: "Unauthorized",
      message: "Cartão expirado",
    };
  }

  if (card.isBlocked === false) {
    throw {
      code: "Unauthorized",
      message: "Cartão já está desbloqueado",
    };
  }

  if (card.isBlocked === true && card.password === null) {
    throw {
      code: "Unauthorized",
      message: "Necessário realizar a ativação do cartão",
    };
  }

  const passwordNumber = Number(password.password);

  if (isNaN(passwordNumber)) {
    throw {
      code: "Unauthorized",
      message: "Senha deve ser composta por 4 números",
    };
  }

  const cryptr: any = new Cryptr("myTotallySecretKey");

  const decryptPassword: string = cryptr.decrypt(card.password);

  if (decryptPassword !== password.password) {
    throw {
      code: "Unauthorized",
      message: "Senha não confere",
    };
  }

  await update(card.id, {isBlocked: false})

  return "success";
}
