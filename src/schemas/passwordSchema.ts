import joi from "joi";

const blockCardSchema = joi.object({
  password: joi.string().min(4).max(4).required(),
});

export default blockCardSchema;