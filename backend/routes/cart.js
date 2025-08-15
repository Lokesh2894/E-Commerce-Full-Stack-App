const express = require('express');
const router = express.Router();
const { isAuthenticatedUser } = require('../middleware/auth');

// In-memory cart storage (in production, you'd use Redis or database)
let carts = new Map();

// Get cart items => /api/cart
router.get('/', isAuthenticatedUser, (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = carts.get(userId) || [];
    
    res.status(200).json({
      success: true,
      cart: userCart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add item to cart => /api/cart/add
router.post('/add', isAuthenticatedUser, (req, res) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body;
    const userId = req.user.id;

    if (!productId || !name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Product information is required'
      });
    }

    let userCart = carts.get(userId) || [];
    
    // Check if product already exists in cart
    const existingItemIndex = userCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      // Update quantity if product already exists
      userCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      userCart.push({
        productId,
        name,
        price,
        image,
        quantity
      });
    }

    carts.set(userId, userCart);

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      cart: userCart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update cart item quantity => /api/cart/update
router.put('/update', isAuthenticatedUser, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    let userCart = carts.get(userId) || [];
    const itemIndex = userCart.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      userCart.splice(itemIndex, 1);
    } else {
      // Update quantity
      userCart[itemIndex].quantity = quantity;
    }

    carts.set(userId, userCart);

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart: userCart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Remove item from cart => /api/cart/remove
router.delete('/remove/:productId', isAuthenticatedUser, (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    let userCart = carts.get(userId) || [];
    const itemIndex = userCart.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    userCart.splice(itemIndex, 1);
    carts.set(userId, userCart);

    res.status(200).json({
      success: true,
      message: 'Item removed from cart successfully',
      cart: userCart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Clear cart => /api/cart/clear
router.delete('/clear', isAuthenticatedUser, (req, res) => {
  try {
    const userId = req.user.id;
    carts.set(userId, []);

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart: []
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get cart total => /api/cart/total
router.get('/total', isAuthenticatedUser, (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = carts.get(userId) || [];
    
    const total = userCart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const itemCount = userCart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    res.status(200).json({
      success: true,
      total: total.toFixed(2),
      itemCount
    });
  } catch (error) {
    console.error('Get cart total error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;

