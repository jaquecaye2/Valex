import joi from "joi";

export const users = joi.object({
  firstUser: joi.string().required(),
  secondUser: joi.string().required(),
});
