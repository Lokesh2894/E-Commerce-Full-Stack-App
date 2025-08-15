import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../store/slices/orderSlice';
import MetaData from '../layout/MetaData';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!order) {
    return <div style={styles.error}>Order not found</div>;
  }

  return (
    <>
      <MetaData title="Order Details" />
      <div style={styles.container}>
        <h2 style={styles.title}>Order Details</h2>
        
        <div style={styles.orderContainer}>
          <div style={styles.section}>
            <h3>Order Information</h3>
            <div style={styles.info}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.totalPrice}</p>
            </div>
          </div>

          <div style={styles.section}>
            <h3>Shipping Information</h3>
            <div style={styles.info}>
              <p><strong>Address:</strong> {order.shippingInfo.address}</p>
              <p><strong>City:</strong> {order.shippingInfo.city}</p>
              <p><strong>Phone:</strong> {order.shippingInfo.phoneNo}</p>
              <p><strong>Postal Code:</strong> {order.shippingInfo.postalCode}</p>
              <p><strong>Country:</strong> {order.shippingInfo.country}</p>
            </div>
          </div>

          <div style={styles.section}>
            <h3>Order Items</h3>
            <div style={styles.items}>
              {order.orderItems.map((item, index) => (
                <div key={index} style={styles.item}>
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
};

export default OrderDetails;

