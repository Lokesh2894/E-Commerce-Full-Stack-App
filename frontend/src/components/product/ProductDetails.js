import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../store/slices/productSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import MetaData from '../layout/MetaData';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url,
      quantity: parseInt(quantity)
    };

    dispatch(addToCart(cartItem));
    toast.success('Item added to cart');
  };

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div style={styles.error}>Product not found</div>;
  }

  return (
    <>
      <MetaData title={product.name} />
      <div style={styles.container}>
        <div style={styles.productContainer}>
          <div style={styles.imageSection}>
            <img 
              src={product.images[0]?.url} 
              alt={product.name}
              style={styles.productImage}
            />
          </div>
          
          <div style={styles.detailsSection}>
            <h1 style={styles.productName}>{product.name}</h1>
            
            <div style={styles.rating}>
              <FaStar style={styles.star} />
              <span>{product.ratings} out of 5</span>
              <span style={styles.reviews}>({product.numOfReviews} reviews)</span>
            </div>
            
            <div style={styles.price}>${product.price}</div>
            
            <p style={styles.description}>{product.description}</p>
            
            <div style={styles.stock}>
              <span>Status: </span>
              <span style={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.stock > 0 && (
              <div style={styles.addToCartSection}>
                <div style={styles.quantitySection}>
                  <label htmlFor="quantity">Quantity:</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    style={styles.quantitySelect}
                  >
                    {[...Array(product.stock).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={addToCartHandler}
                  style={styles.addToCartButton}
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            )}
            
            <div style={styles.productInfo}>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Seller:</strong> {product.seller}</p>
              <p><strong>Stock:</strong> {product.stock} units</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#dc3545',
    padding: '2rem',
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '8px',
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  productName: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  star: {
    color: '#ffc107',
  },
  reviews: {
    color: '#666',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#666',
    marginBottom: '1rem',
  },
  stock: {
    marginBottom: '1rem',
  },
  inStock: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  outOfStock: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  addToCartSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
  },
  quantitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  quantitySelect: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  addToCartButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  productInfo: {
    borderTop: '1px solid #ddd',
    paddingTop: '1rem',
  },
};

export default ProductDetails;

