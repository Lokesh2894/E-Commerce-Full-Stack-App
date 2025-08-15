import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { processCheckout } from '../../store/slices/orderSlice';
import { clearCartLocal } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);
  const { loading } = useSelector(state => state.orders);
  
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const storedShippingInfo = localStorage.getItem('shippingInfo');
    if (storedShippingInfo) {
      setShippingInfo(JSON.parse(storedShippingInfo));
    }
  }, []);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (!shippingInfo) {
    navigate('/shipping');
    return null;
  }

  const taxPrice = total * 0.1;
  const shippingPrice = total > 100 ? 0 : 10;
  const totalPrice = total + taxPrice + shippingPrice;

  const confirmOrderHandler = () => {
    dispatch(processCheckout(shippingInfo))
      .unwrap()
      .then(() => {
        dispatch(clearCartLocal());
        localStorage.removeItem('shippingInfo');
        toast.success('Order placed successfully!');
        navigate('/success');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to place order');
      });
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <div style={styles.container}>
        <h2 style={styles.title}>Confirm Order</h2>
        
        <div style={styles.orderContainer}>
          <div style={styles.section}>
            <h3>Shipping Information</h3>
            <div style={styles.info}>
              <p><strong>Address:</strong> {shippingInfo.address}</p>
              <p><strong>City:</strong> {shippingInfo.city}</p>
              <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
              <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
              <p><strong>Country:</strong> {shippingInfo.country}</p>
            </div>
          </div>

          <div style={styles.section}>
            <h3>Order Items</h3>
            <div style={styles.items}>
              {items.map((item) => (
                <div key={item.productId} style={styles.item}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemDetails}>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div style={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h3>Order Summary</h3>
            <div style={styles.summary}>
              <div style={styles.summaryItem}>
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={styles.summaryItem}>
                <span>Tax (10%):</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div style={styles.summaryItem}>
                <span>Shipping:</span>
                <span>{shippingPrice === 0 ? 'Free' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div style={styles.total}>
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={confirmOrderHandler}
            disabled={loading}
            style={styles.confirmButton}
          >
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>
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
  orderContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  section: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  info: {
    marginTop: '1rem',
  },
  items: {
    marginTop: '1rem',
  },
  item: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  itemTotal: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#333',
  },
  summary: {
    marginTop: '1rem',
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
  confirmButton: {
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

export default ConfirmOrder;

