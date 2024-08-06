// models
const ComboDeal = require("../models/comboDeal");
const Product = require("../models/product");

// validators
const { validateComboProduct } = require("../validator/comboProduct.validator");

// function is used to get all combo products information
exports.getComboProducts = async (req, res) => {
  const comboProducts = await ComboDeal.find().populate("products");

  res.send({
    isSuccess: true,
    status: 200,
    message: "Fetched Combo Products successfully",
    data: { comboProducts },
  });
};

// function is used to get single combo product deals information
exports.getComboProductById = async (req, res) => {
  const comboProductId = req.params.id;
  const comboProduct = await ComboDeal.findById(comboProductId).populate(
    "products"
  );

  if (!comboProduct)
    return res.status(404).send({
      status: 404,
      isSuccess: false,
      message: "Combo Product not found by given id",
    });

  res.send({
    isSuccess: true,
    status: 200,
    message: "Fetched product successfully",
    data: {
      comboProduct: comboProduct,
      totalPrice:
        comboProduct.products[0].price + comboProduct.products[1].price,
      discountedPrice:
        comboProduct.products[0].discountedPrice +
        comboProduct.products[1].discountedPrice,
    },
  });
};

// function is used to create new combo products
exports.createComboProduct = async (req, res) => {
  const { error } = validateComboProduct(req.body);
  if (error)
    return res.status(400).send({
      status: 400,
      isSuccess: false,
      message: error.details[0].message,
    });

  const { products } = req.body;

  //  checking first combo product available in DB
  const firstProduct = await Product.findById(products[0]);
  if (!firstProduct)
    return res.status(404).send({
      status: 404,
      isSuccess: false,
      message: "First product is not found",
    });

  //  checking second combo product available in DB
  const secondProduct = await Product.findById(products[1]);
  if (!secondProduct)
    return res.status(404).send({
      status: 404,
      isSuccess: false,
      message: "Second product is not found",
    });

  // creating a new combo products with discounted price of first and second product
  const newComboProduct = new ComboDeal({
    products,
  });
  await newComboProduct.save();

  res.status(201).send({
    isSuccess: true,
    status: 201,
    message: "Products combo created successfully",
    data: { comboProduct: newComboProduct },
  });
};
