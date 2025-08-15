const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Get all products => /api/products
router.get('/', async (req, res) => {
  try {
    console.log('Products API called with query:', req.query);
    const resPerPage = 8;
    const productsCount = await Product.countDocuments();
    console.log('Total products in DB:', productsCount);

    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    console.log('Filtered products count:', filteredProductsCount);

    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();
    console.log('Final products to return:', products.length);

    res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single product details => /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format. Product ID must be a 24-character hexadecimal string.',
        hint: 'Make sure you are accessing a valid product page from the products list.'
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new product => /api/products/new
router.post('/new', isAuthenticatedUser, authorizeRoles('admin'), async (req, res) => {
  try {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update Product => /api/products/:id
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete Product => /api/products/:id
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new product review => /api/products/review
router.put('/review', isAuthenticatedUser, async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach(review => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get Product Reviews => /api/products/reviews
router.get('/reviews/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success: true,
      reviews: product.reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete Product Review => /api/products/reviews
router.delete('/reviews', isAuthenticatedUser, async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// APIFeatures class for filtering, searching and pagination
class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      $or: [
        {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: this.queryStr.keyword,
            $options: 'i'
          }
        }
      ]
    } : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(el => delete queryCopy[el]);

    // Handle price range filtering
    if (queryCopy.price) {
      const priceRange = queryCopy.price.split(',');
      if (priceRange.length === 2) {
        queryCopy.price = {
          $gte: parseFloat(priceRange[0]),
          $lte: parseFloat(priceRange[1])
        };
      }
    }

    // Advanced filter for ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = router;

