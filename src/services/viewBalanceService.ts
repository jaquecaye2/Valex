import { findByCardIdRecharge } from "../repositories/rechargeRepository";
import { findByCardIdPayment } from "../repositories/paymentRepository";

export async function viewBalanceService(card: any) {
  if (card.isBlocked === true) {
    throw {
      code: "Unauthorized",
      message: "Cartão bloqueado",
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

  const balance: number = totalRecharge - totalPayments;

  let result = {
    balance,
    transactions: resultPayments,
    recharges: resultRecharges,
  };

  return result;
}
