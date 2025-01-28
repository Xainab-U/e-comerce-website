const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Import bcrypt

const sequelize = new Sequelize('ecommerce', 'root', '#2003Vaishu', { dialect: 'mysql' });

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

// Add a lifecycle hook for hashing the password before saving
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

const Category = sequelize.define('Category', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

Product.belongsTo(Category);

const Cart = sequelize.define('Cart', {
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

Cart.belongsTo(User);
Cart.belongsTo(Product);

const Order = sequelize.define('Order', {
  total: { type: DataTypes.FLOAT },
});

Order.belongsTo(User);

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
});

module.exports = { User, Category, Product, Cart, Order };
