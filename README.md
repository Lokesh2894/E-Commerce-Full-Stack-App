# E-Commerce Full-Stack Application

A complete e-commerce application built with React frontend and Node.js backend with MongoDB database.

## Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- User profile management

### 🛍️ Product Management
- Product listing with search and filtering
- Product details with reviews
- Product categories
- Admin product management (CRUD operations)

### 🛒 Shopping Cart
- Add/remove items from cart
- Update quantities
- Cart persistence
- Real-time cart total calculation

### 💳 Checkout Process
- Shipping information collection
- Order confirmation
- Payment processing (demo)
- Order history

### 📱 Responsive Design
- Mobile-friendly interface
- Modern UI with styled components
- Intuitive user experience

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config.env
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── product/
│   │   │   ├── cart/
│   │   │   ├── user/
│   │   │   └── route/
│   │   ├── store/
│   │   │   └── slices/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd ecommerce-app
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:
```bash
cd backend
cp config.env .env
```

Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

### 4. Database Setup

Make sure MongoDB is running on your system, then seed the database:
```bash
cd backend
node seed.js
```

This will create:
- Admin user (email: admin@example.com, password: admin123)
- Sample products

### 5. Start the Application

#### Development Mode (Both frontend and backend)
```bash
# From the root directory
npm run dev
```

#### Individual Services
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `GET /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products/new` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/checkout` - Process checkout
- `GET /api/orders/me/my` - Get user orders
- `GET /api/orders/:id` - Get order details

## Usage

### For Users
1. **Register/Login**: Create an account or login with existing credentials
2. **Browse Products**: View products on the home page or products page
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: View cart, update quantities, or remove items
5. **Checkout**: Proceed to checkout and complete your order

### For Admins
1. **Login**: Use admin credentials (admin@example.com / admin123)
2. **Manage Products**: Add, edit, or delete products
3. **View Orders**: Access order management features

## Features in Detail

### Authentication System
- Secure password hashing with bcrypt
- JWT token-based authentication
- Protected routes for authenticated users
- Role-based access control (Admin/User)

### Product Management
- Full CRUD operations for products
- Image support with URL links
- Category-based organization
- Search and filtering capabilities
- Review and rating system

### Shopping Cart
- Persistent cart storage
- Real-time quantity updates
- Automatic total calculation
- Tax and shipping calculations

### Order Processing
- Complete checkout flow
- Shipping information collection
- Order confirmation
- Order history tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue in the repository.

## Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Social media authentication
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Analytics and reporting

