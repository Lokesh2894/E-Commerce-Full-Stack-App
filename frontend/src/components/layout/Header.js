import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { clearCartLocal } from '../../store/slices/cartSlice';
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { itemCount } = useSelector(state => state.cart);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    } else {
      navigate('/');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCartLocal());
    navigate('/');
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header style={styles.header}>
      <div className="container">
        <div style={styles.nav}>
          <Link to="/" style={styles.logo}>
            <h1>E-Commerce</h1>
          </Link>

          <form onSubmit={searchHandler} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>
              <FaSearch />
            </button>
          </form>

          <nav style={styles.navLinks}>
            <Link to="/products" style={styles.navLink}>
              Products
            </Link>
            
            {isAuthenticated ? (
              <div style={styles.userMenu}>
                <Link to="/cart" style={styles.cartLink}>
                  <FaShoppingCart />
                  <span style={styles.cartBadge}>{itemCount}</span>
                </Link>
                
                <div style={styles.dropdown}>
                  <button 
                    style={styles.dropdownButton}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <FaUser />
                    {user?.name}
                  </button>
                  
                  {isMenuOpen && (
                    <div style={styles.dropdownMenu}>
                      <Link to="/me" style={styles.dropdownItem}>
                        Profile
                      </Link>
                      <Link to="/orders/me" style={styles.dropdownItem}>
                        My Orders
                      </Link>
                      <button 
                        onClick={logoutHandler}
                        style={styles.dropdownItem}
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={styles.authLinks}>
                <Link to="/login" style={styles.authLink}>
                  Login
                </Link>
                <Link to="/register" style={styles.authLink}>
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: {
    textDecoration: 'none',
    color: '#333',
  },
  logo: {
    textDecoration: 'none',
    color: '#333',
  },
  searchForm: {
    display: 'flex',
    flex: 1,
    maxWidth: '500px',
    margin: '0 2rem',
  },
  searchInput: {
    flex: 1,
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
    fontSize: '1rem',
  },
  searchButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: '500',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  cartLink: {
    position: 'relative',
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.2rem',
  },
  cartBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
  dropdown: {
    position: 'relative',
  },
  dropdownButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    minWidth: '150px',
    zIndex: 1000,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    color: '#333',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  authLinks: {
    display: 'flex',
    gap: '1rem',
  },
  authLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: '500',
  },
};

export default Header;

