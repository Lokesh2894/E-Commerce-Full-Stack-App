import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.content}>
          <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
          <div style={styles.links}>
            <a href="#" style={styles.link}>Privacy Policy</a>
            <a href="#" style={styles.link}>Terms of Service</a>
            <a href="#" style={styles.link}>Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '2rem 0',
    marginTop: 'auto',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Footer;

