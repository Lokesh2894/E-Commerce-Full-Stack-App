import React from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const UpdateProfile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <MetaData title="Update Profile" />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Update Profile</h2>
          <p style={styles.message}>Profile update functionality coming soon...</p>
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

export default UpdateProfile;

