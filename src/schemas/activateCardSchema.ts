import joi from "joi";

const activateCardSchema = joi.object({
  cvc: joi.string().min(3).max(3).required(),
  password: joi.string().min(4).max(4).required(),
});

export default activateCardSchema;