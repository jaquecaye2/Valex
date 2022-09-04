import joi from "joi";

const purchaseSchema = joi.object({
  password: joi.string().min(4).max(4).required(),
  businessesId: joi.number().min(1).required(),
  amount: joi.number().min(1).required()
});

export default purchaseSchema;
