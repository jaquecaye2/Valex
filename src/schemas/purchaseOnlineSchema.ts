import joi from "joi";

const purchaseOnlineSchema = joi.object({
  number: joi.string().min(16).max(16).required(),
  cardholderName: joi.string().required(),
  securityCode: joi.string().min(3).max(3).required(),
  expirationDate: joi.date().required(),
  businessesId: joi.number().min(1).required(),
  amount: joi.number().min(1).required()
});

export default purchaseOnlineSchema;
