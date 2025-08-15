const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { isAuthenticatedUser } = require('../middleware/auth');

// In-memory cart storage (same as cart.js)
let carts = new Map();

// Create new order => /api/orders/new
router.post('/new', isAuthenticatedUser, async (req, res) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single order => /api/orders/:id
router.get('/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get logged in user orders => /api/orders/me/my
router.get('/me/my', isAuthenticatedUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all orders - Admin => /api/orders/admin/orders
router.get('/admin/orders', isAuthenticatedUser, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');

    let totalAmount = 0;
    orders.forEach(order => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update / Process order - Admin => /api/orders/admin/order/:id
router.put('/admin/order/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'You have already delivered this order'
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete order => /api/orders/admin/order/:id
router.delete('/admin/order/:id', isAuthenticatedUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Process checkout => /api/orders/checkout
router.post('/checkout', isAuthenticatedUser, async (req, res) => {
  try {
    const { shippingInfo } = req.body;
    const userId = req.user.id;
    
    // Get user's cart
    const userCart = carts.get(userId) || [];
    
    if (userCart.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate prices
    const itemsPrice = userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxPrice = itemsPrice * 0.1; // 10% tax
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Create order items array
    const orderItems = userCart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      product: item.productId
    }));

    // Create order
    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo: {
        id: 'demo_payment_id',
        status: 'succeeded'
      },
      paidAt: Date.now(),
      user: req.user._id
    });

    // Clear cart after successful order
    carts.set(userId, []);

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;

