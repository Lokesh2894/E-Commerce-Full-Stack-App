import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/slices/productSlice';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, productsCount, resPerPage } = useSelector(state => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000]);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ];

  useEffect(() => {
    const params = {
      page: currentPage,
      price: price.join(','),
      category,
      ratings
    };
    console.log('Dispatching getProducts with params:', params);
    dispatch(getProducts(params));
  }, [dispatch, currentPage, price, category, ratings]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const count = productsCount;

  return (
    <>
      <MetaData title="Products" />
      <div style={styles.container}>
        <h2 style={styles.title}>Products</h2>
        
        <div style={styles.productsContainer}>
          <div style={styles.filters}>
            <h3>Filters</h3>
            
            <div style={styles.filterGroup}>
              <h4>Price Range</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={price[1]}
                onChange={(e) => setPrice([price[0], parseInt(e.target.value)])}
                style={styles.range}
              />
              <span>${price[1]}</span>
            </div>

            <div style={styles.filterGroup}>
              <h4>Category</h4>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.select}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <h4>Ratings</h4>
              <select
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                style={styles.select}
              >
                <option value="">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </div>
          </div>

          <div style={styles.productsSection}>
            {loading ? (
              <div style={styles.loading}>Loading...</div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div style={styles.noProducts}>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or check back later.</p>
                    <p>Debug info: {products.length} products loaded</p>
                  </div>
                ) : (
                  <>
                    <div style={styles.productsGrid}>
                      {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>

                    {resPerPage <= count && (
                      <div style={styles.pagination}>
                        {Array.from({ length: Math.ceil(count / resPerPage) }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPageNo(i + 1)}
                            style={{
                              ...styles.pageButton,
                              ...(currentPage === i + 1 && styles.activePageButton)
                            }}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
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
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '2rem',
  },
  filters: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  filterGroup: {
    marginBottom: '1.5rem',
  },
  range: {
    width: '100%',
    marginBottom: '0.5rem',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  productsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '2rem',
  },
  noProducts: {
    textAlign: 'center',
    padding: '3rem',
    color: '#666',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  pageButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  activePageButton: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  },
};

export default Products;

