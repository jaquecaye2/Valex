import Cryptr from "cryptr";

import { findById } from "../repositories/businessRepository";
import { findByCardIdRecharge } from "../repositories/rechargeRepository";
import { findByCardIdPayment } from "../repositories/paymentRepository";
import { insert } from "../repositories/paymentRepository";

export async function purchaseService(card: any, infoPurchase: any) {
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

  const passwordNumber = Number(infoPurchase.password);

  if (isNaN(passwordNumber)) {
    throw {
      code: "Unauthorized",
      message: "Senha deve ser composta por 4 números",
    };
  }

  const cryptr: any = new Cryptr("myTotallySecretKey");

  const decryptPassword: string = cryptr.decrypt(card.password);

  if (decryptPassword !== infoPurchase.password) {
    throw {
      code: "Unauthorized",
      message: "Senha não confere",
    };
  }

  const businessesFind = await findById(infoPurchase.businessesId);

  if (!businessesFind) {
    throw {
      code: "Unauthorized",
      message: "Estabelecimento não cadastrado",
    };
  }

  if (businessesFind.type !== card.type) {
    throw {
      code: "Unauthorized",
      message: "O estabelecimento não aceita esse tipo de compra",
    };
  }

  let resultRecharges = await findByCardIdRecharge(card.id);

  let totalRecharge: number = 0;

  for (let i = 0; i < resultRecharges.length; i++) {
    totalRecharge += resultRecharges[i].amount;
  }

  let resultPayments = await findByCardIdPayment(card.id);

  let totalPayments: number = 0;

  for (let i = 0; i < resultPayments.length; i++) {
    totalPayments += resultPayments[i].amount;
  }

  const balance = totalRecharge - totalPayments;

  if (balance <= infoPurchase.amount) {
    throw {
      code: "Unauthorized",
      message: "Saldo insuficiente",
    };
  }

  const paymentData = {
    cardId: card.id,
    businessId: infoPurchase.businessesId,
    amount: infoPurchase.amount,
  };

  await insert(paymentData);

  return "success";
}
