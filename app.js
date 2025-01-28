const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Test route to check if backend is working
app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

sequelize.authenticate().then(() => console.log('Database connected')).catch(console.error);

app.listen(3000, () => console.log('Server running on port 3000'));
