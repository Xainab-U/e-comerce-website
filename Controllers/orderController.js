const { Cart, Order, Product } = require('../models');

const placeOrder = async (req, res) => {
  const userId = req.userId; // Extracted from JWT
  const cartItems = await Cart.findAll({ where: { userId }, include: Product });
  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);
  const order = await Order.create({ userId, total });
  await Cart.destroy({ where: { userId } }); // Clear cart
  res.json(order);
};

module.exports = { placeOrder };
