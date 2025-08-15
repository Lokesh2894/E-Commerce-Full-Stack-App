import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../store/slices/orderSlice';
import MetaData from '../layout/MetaData';

const ListOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <>
      <MetaData title="My Orders" />
      <div style={styles.container}>
        <h2 style={styles.title}>My Orders</h2>
        
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={styles.noOrders}>
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div style={styles.ordersList}>
            {orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <span style={styles.orderStatus}>{order.orderStatus}</span>
                </div>
                <div style={styles.orderDetails}>
                  <p><strong>Total:</strong> ${order.totalPrice}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Items:</strong> {order.orderItems.length}</p>
                </div>
              </div>
            ))}
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
  noOrders: {
    textAlign: 'center',
    padding: '3rem',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  orderCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  orderStatus: {
    padding: '0.25rem 0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
};

export default ListOrders;

