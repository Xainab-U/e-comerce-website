const { Product, Category } = require('../models');

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({ include: Category });
  res.json(products);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

module.exports = { getAllProducts, createProduct };
