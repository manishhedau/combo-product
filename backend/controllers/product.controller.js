// models
const Product = require("../models/product");

// validators
const { validateProduct } = require("../validator/product.validator");

// function is used to get all products information
exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.send({
    isSuccess: true,
    status: 200,
    message: "Fetched Products successfully",
    data: { products },
  });
};

// function is used to get single product information
exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product)
    return res.status(404).send({
      status: 404,
      isSuccess: false,
      message: "Product not found by given id",
    });

  res.send({
    isSuccess: true,
    status: 200,
    message: "Fetched product successfully",
    data: { product },
  });
};

// function is used to create new product
exports.createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error)
    return res.status(400).send({
      status: 400,
      isSuccess: false,
      message: error.details[0].message,
    });

  const newProduct = new Product(req.body);
  await newProduct.save();

  res.status(201).send({
    isSuccess: true,
    status: 201,
    message: "Product created successfully",
    data: { product: newProduct },
  });
};
