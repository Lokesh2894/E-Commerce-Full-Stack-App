import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/productSlice';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, productsCount } = useSelector(state => state.products);
  
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (keyword) {
      dispatch(getProducts({ keyword }));
    }
  }, [dispatch, keyword]);

  return (
    <>
      <MetaData title={`Search Results for ${keyword}`} />
      <div style={styles.container}>
        <h2 style={styles.title}>
          Search Results for "{keyword}"
        </h2>
        
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : products.length === 0 ? (
          <div style={styles.noResults}>
            <h3>No products found</h3>
            <p>Try searching with different keywords</p>
          </div>
        ) : (
          <>
            <p style={styles.resultsCount}>
              Found {productsCount} product(s)
            </p>
            <div style={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
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
    marginBottom: '1rem',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem',
  },
  resultsCount: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
  },
};

export default Search;

