import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import MetaData from '../layout/MetaData';

const OrderSuccess = () => {
  return (
    <>
      <MetaData title="Order Success" />
      <div style={styles.container}>
        <div style={styles.successCard}>
          <FaCheckCircle style={styles.successIcon} />
          <h1 style={styles.title}>Order Placed Successfully!</h1>
          <p style={styles.message}>
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div style={styles.actions}>
            <Link to="/" style={styles.button}>
              Continue Shopping
            </Link>
            <Link to="/orders/me" style={styles.button}>
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    padding: '2rem 0',
  },
  successCard: {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
  },
  successIcon: {
    fontSize: '4rem',
    color: '#28a745',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease',
  },
};

export default OrderSuccess;

