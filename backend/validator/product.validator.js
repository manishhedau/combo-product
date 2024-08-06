const Joi = require("joi");

function validateProduct(req) {
  const validationSchema = Joi.object({
    name: Joi.string().min(5).max(255).required().label("Name"),
    description: Joi.string().min(5).max(255).required().label("Description"),
    price: Joi.number().min(1).required().label("Price"),
    discountedPrice: Joi.number().min(1).required().label("Discounted Price"),
    productImageUrl: Joi.string().min(5).required().label("Product Image Url"),
  });
  return validationSchema.validate(req);
}

module.exports = { validateProduct };
