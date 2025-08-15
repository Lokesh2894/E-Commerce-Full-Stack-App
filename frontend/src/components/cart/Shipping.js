import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const Shipping = () => {
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    phoneNo: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.phoneNo || !shippingInfo.postalCode || !shippingInfo.country) {
      alert('Please fill in all fields');
      return;
    }

    // Store shipping info in localStorage for next step
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    navigate('/order/confirm');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <MetaData title="Shipping Information" />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Shipping Information</h2>
          
          <form onSubmit={submitHandler} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}>
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phoneNo" style={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                value={shippingInfo.phoneNo}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="postalCode" style={styles.label}>
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="country" style={styles.label}>
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={shippingInfo.country}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Continue to Order Confirmation
            </button>
          </form>
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
    maxWidth: '500px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default Shipping;

