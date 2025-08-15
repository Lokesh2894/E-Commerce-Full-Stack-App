import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCart, updateCartItem, removeFromCart } from '../../store/slices/cartSlice';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import MetaData from '../layout/MetaData';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, loading, total } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  const increaseQuantity = (productId, quantity) => {
    const newQuantity = quantity + 1;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
  };

  const decreaseQuantity = (productId, quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    }
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <>
      <MetaData title="Shopping Cart" />
      <div style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={styles.emptyCart}>
            <h2>Your cart is empty</h2>
            <Link to="/products" style={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={styles.cartContainer}>
            <div style={styles.itemsContainer}>
              {items.map((item) => (
                <div key={item.productId} style={styles.cartItem}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  
                  <div style={styles.itemDetails}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemPrice}>${item.price}</p>
                  </div>
                  
                  <div style={styles.quantityContainer}>
                    <button
                      onClick={() => decreaseQuantity(item.productId, item.quantity)}
                      style={styles.quantityButton}
                    >
                      <FaMinus />
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.productId, item.quantity)}
                      style={styles.quantityButton}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div style={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.productId)}
                    style={styles.removeButton}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div style={styles.summary}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryItem}>
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={styles.summaryItem}>
                <span>Tax (10%):</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div style={styles.summaryItem}>
                <span>Shipping:</span>
                <span>{total > 100 ? 'Free' : '$10.00'}</span>
              </div>
              <div style={styles.total}>
                <span>Total:</span>
                <span>${(total + (total * 0.1) + (total > 100 ? 0 : 10)).toFixed(2)}</span>
              </div>
              
              <button
                onClick={checkoutHandler}
                style={styles.checkoutButton}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: '2rem 0',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '3rem',
  },
  continueShopping: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '1rem',
  },
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto auto auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: '1rem',
    color: '#007bff',
    fontWeight: '600',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    padding: '0.5rem',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quantity: {
    fontSize: '1rem',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
  },
  removeButton: {
    padding: '0.5rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  summaryTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: '1rem',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #ddd',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333',
  },
  checkoutButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default Cart;

