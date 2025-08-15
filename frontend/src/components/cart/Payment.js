import React from 'react';
import MetaData from '../layout/MetaData';

const Payment = () => {
  return (
    <>
      <MetaData title="Payment" />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Payment</h2>
          <p style={styles.message}>Payment integration coming soon...</p>
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
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  message: {
    fontSize: '1.1rem',
    color: '#666',
  },
};

export default Payment;

