import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/slices/productSlice';
import ProductCard from './product/ProductCard';
import MetaData from './layout/MetaData';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Filter products by category
  const featuredProducts = useMemo(() => {
    if (!products.length) return [];
    return products.slice(0, 8);
  }, [products]);

  const electronicsProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.category === 'Electronics').slice(0, 6);
  }, [products]);

  const accessoriesProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.category === 'Accessories').slice(0, 6);
  }, [products]);

  const headphonesProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.category === 'Headphones').slice(0, 4);
  }, [products]);

  const laptopProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.category === 'Laptops').slice(0, 4);
  }, [products]);

  const budgetProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.price < 50).slice(0, 6);
  }, [products]);

  const premiumProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter(product => product.price > 200).slice(0, 4);
  }, [products]);

  return (
    <>
      <MetaData title="E-Commerce Store" />
      
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to TechStore</h1>
          <p style={styles.heroSubtitle}>
            Discover the latest in technology and electronics
          </p>
          <div style={styles.heroStats}>
            <div style={styles.stat}>
              <span style={styles.statNumber}>50+</span>
              <span style={styles.statLabel}>Products</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>5</span>
              <span style={styles.statLabel}>Categories</span>
            </div>
            <div style={styles.stat}>
              <span style={styles.statNumber}>24/7</span>
              <span style={styles.statLabel}>Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>🔥 Featured Products</h2>
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : (
          <div style={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Electronics Category */}
      {electronicsProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📱 Electronics</h2>
          <div style={styles.productsGrid}>
            {electronicsProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Accessories Category */}
      {accessoriesProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔧 Accessories</h2>
          <div style={styles.productsGrid}>
            {accessoriesProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Headphones Category */}
      {headphonesProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🎧 Headphones & Audio</h2>
          <div style={styles.productsGrid}>
            {headphonesProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Laptops Category */}
      {laptopProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💻 Laptops & Computers</h2>
          <div style={styles.productsGrid}>
            {laptopProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Budget Products */}
      {budgetProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💰 Budget Friendly (Under $50)</h2>
          <div style={styles.productsGrid}>
            {budgetProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Premium Products */}
      {premiumProducts.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⭐ Premium Products</h2>
          <div style={styles.productsGrid}>
            {premiumProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Shop?</h2>
          <p style={styles.ctaText}>
            Explore our complete collection of products and find exactly what you need.
          </p>
          <button style={styles.ctaButton} onClick={() => window.location.href = '/products'}>
            View All Products
          </button>
        </div>
      </section>
    </>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 0',
    textAlign: 'center',
    marginBottom: '3rem',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    opacity: 0.9,
    marginBottom: '2rem',
  },
  heroStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginTop: '2rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1rem',
    opacity: 0.8,
  },
  section: {
    marginBottom: '4rem',
    padding: '0 1rem',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
    marginTop: '3rem',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  ctaText: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaButton: {
    background: 'white',
    color: '#f5576c',
    border: 'none',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
};

export default Home;

