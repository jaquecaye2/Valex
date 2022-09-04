import Cryptr from "cryptr";

import { findById } from "../repositories/businessRepository";
import { findByCardIdRecharge } from "../repositories/rechargeRepository";
import { findByCardIdPayment } from "../repositories/paymentRepository";
import { insert } from "../repositories/paymentRepository";

export async function purchaseOnlineService(card: any, infoPurchase: any) {
  if (card.number !== infoPurchase.number){
    throw {
      code: "Unauthorized",
      message: "Número do cartão não confere",
    };
  }

  if (card.cardholderName.trim() !== infoPurchase.cardholderName.trim()){
    throw {
      code: "Unauthorized",
      message: "Nome do cartão não confere",
    };
  }

  const cryptr: any = new Cryptr("myTotallySecretKey");

  const decryptCvc: string = cryptr.decrypt(card.securityCode);

  console.log(decryptCvc)

  if (decryptCvc !== infoPurchase.securityCode) {
    throw {
      code: "Unauthorized",
      message: "Código de segurança não confere",
    };
  }

  if (card.expirationDate !== infoPurchase.expirationDate){
    throw {
      code: "Unauthorized",
      message: "Data de expiração não confere",
    };
  }
  
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
