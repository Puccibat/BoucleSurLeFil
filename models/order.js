const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    clientName: String,
    orderDate: Date,
    status: {
      type: String,
      default: 'Pas traitée',
      enum: ['Pas traitée', 'En préparation', 'Envoyée', 'Annulée'] // enum means string objects
    },
    updated: Date
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order, CartItem };
