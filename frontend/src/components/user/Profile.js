import React from 'react';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <MetaData title="Profile" />
      <div style={styles.container}>
        <div style={styles.profileCard}>
          <h2 style={styles.title}>My Profile</h2>
          
          <div style={styles.profileInfo}>
            <div style={styles.infoItem}>
              <strong>Name:</strong> {user?.name}
            </div>
            <div style={styles.infoItem}>
              <strong>Email:</strong> {user?.email}
            </div>
            <div style={styles.infoItem}>
              <strong>Role:</strong> {user?.role}
            </div>
            <div style={styles.infoItem}>
              <strong>Member Since:</strong> {new Date(user?.createdAt).toLocaleDateString()}
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
  profileCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  infoItem: {
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: '4px',
    fontSize: '1.1rem',
  },
};

export default Profile;

