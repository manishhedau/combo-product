const Joi = require("joi");

function validateComboProduct(req) {
  let objectId = Joi.objectId();
  const validationSchema = Joi.object({
    products: Joi.array()
      .min(2)
      .max(2)
      .items(objectId)
      .required()
      .label("products"),
  });
  return validationSchema.validate(req);
}

module.exports = { validateComboProduct };
