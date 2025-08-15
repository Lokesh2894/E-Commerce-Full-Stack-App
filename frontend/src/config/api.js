const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://ecommerce-backend-cwzztxv45-lokeshs-projects-94000b69.vercel.app'
  : 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/update-profile`,
    UPDATE_PASSWORD: `${API_BASE_URL}/auth/update-password`,
  },
  PRODUCTS: {
    ALL: `${API_BASE_URL}/products`,
    DETAILS: (id) => `${API_BASE_URL}/products/${id}`,
    SEARCH: `${API_BASE_URL}/products/search`,
  },
  CART: {
    ADD: `${API_BASE_URL}/cart/add`,
    GET: `${API_BASE_URL}/cart`,
    UPDATE: `${API_BASE_URL}/cart/update`,
    REMOVE: (id) => `${API_BASE_URL}/cart/remove/${id}`,
  },
  ORDERS: {
    CREATE: `${API_BASE_URL}/orders/new`,
    MY_ORDERS: `${API_BASE_URL}/orders/me`,
    DETAILS: (id) => `${API_BASE_URL}/orders/${id}`,
  },
};

export default API_ENDPOINTS;
