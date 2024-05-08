const Joi = require("joi");
const validateBook = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().domain(3).max(50).required(),
    author: Joi.string().domain(3).max(50).required(),
  });

  const validation = schema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return;
  }
  next();
};
module.exports = validateBook;
