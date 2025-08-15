import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loadUser } from './store/slices/authSlice';
import { getCart } from './store/slices/cartSlice';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/Products';
import Search from './components/product/Search';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

// Protected Route Component
import ProtectedRoute from './components/route/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const { error } = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCart());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error && error !== 'Failed to load user') {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/me" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/me/update" element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          } />
          
          {/* Cart Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/shipping" element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          } />
          <Route path="/order/confirm" element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/success" element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          } />
          
          {/* Order Routes */}
          <Route path="/orders/me" element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          } />
          <Route path="/order/:id" element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

