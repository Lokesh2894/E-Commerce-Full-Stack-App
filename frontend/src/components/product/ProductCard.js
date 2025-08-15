import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {


  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`} style={styles.imageLink}>
        <img 
          src={product.images[0]?.url} 
          alt={product.name}
          style={styles.image}
        />
      </Link>
      
      <div style={styles.content}>
        <Link to={`/product/${product._id}`} style={styles.titleLink}>
          <h3 style={styles.title}>{product.name}</h3>
        </Link>
        
        <div style={styles.rating}>
          <FaStar style={styles.star} />
          <span style={styles.ratingText}>
            {product.numOfReviews} Reviews
          </span>
        </div>
        
        <div style={styles.price}>
          ${product.price}
        </div>
        
        <div style={styles.actions}>
          <Link 
            to={`/product/${product._id}`}
            style={styles.viewButton}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'pointer',
  },
  imageLink: {
    display: 'block',
    textDecoration: 'none',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#333',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  star: {
    color: '#ffc107',
  },
  ratingText: {
    fontSize: '0.9rem',
    color: '#666',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  viewButton: {
    flex: 1,
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s ease',
  },
};

export default ProductCard;

