const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const braintreeRoutes = require('./routes/braintree');
const orderRoutes = require('./routes/order');

connectDB();

// middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);
app.use('/api', orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
