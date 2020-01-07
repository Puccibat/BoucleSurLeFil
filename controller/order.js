const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helper/dbErrorHandler');

exports.create = (req, res) => {
  // console.log('CREATE ORDER: ', req.body);
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error)
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Order.find()
    .sort('-created')
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error)
        });
      }
      res.json(orders);
    });
};
