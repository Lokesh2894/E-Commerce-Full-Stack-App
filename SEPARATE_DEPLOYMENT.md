# Separate Vercel Deployment Guide

This guide will help you deploy your E-Commerce Backend and Frontend as separate Vercel projects.

## 🎯 Current Setup

- **Backend URL**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app`
- **Frontend URL**: `https://ecommerce-frontend-cqhilvqby-lokeshs-projects-94000b69.vercel.app`

## 📁 Project Structure

```
├── backend/
│   ├── api/
│   │   └── index.js         # Serverless API entry point
│   ├── vercel.json          # Backend Vercel config
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   └── middleware/          # Auth middleware
├── frontend/
│   ├── src/
│   │   ├── config/
│   │   │   └── api.js       # API configuration
│   │   ├── store/
│   │   │   └── slices/      # Redux slices
│   │   └── components/      # React components
│   └── vercel.json          # Frontend Vercel config
```

## 🔧 Backend Configuration

### Backend Vercel Config (`backend/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node",
      "config": {
        "maxDuration": 30
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Backend Environment Variables
Add these in your **Backend** Vercel project settings:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URL=https://ecommerce-frontend-cqhilvqby-lokeshs-projects-94000b69.vercel.app
NODE_ENV=production
```

## 🎨 Frontend Configuration

### Frontend Vercel Config (`frontend/vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Frontend Environment Variables
Add these in your **Frontend** Vercel project settings:

```
REACT_APP_API_URL=https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app
REACT_APP_FRONTEND_URL=https://ecommerce-frontend-cqhilvqby-lokeshs-projects-94000b69.vercel.app
```

## 🚀 Deployment Steps

### 1. Backend Deployment

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard for the backend project

### 2. Frontend Deployment

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard for the frontend project

## 🔗 API Endpoints

After deployment, your backend API will be available at:

- **Root**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/`
- **Auth**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/auth/*`
- **Products**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/products/*`
- **Cart**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/cart/*`
- **Orders**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/orders/*`
- **Health**: `https://ecommerce-backend-9iyf687m1-lokeshs-projects-94000b69.vercel.app/health`

## 🛠️ Troubleshooting

### Backend 404 Issues

1. **Check API routes**: Ensure all routes are properly configured in `backend/api/index.js`
2. **Verify Vercel config**: Make sure `backend/vercel.json` is correct
3. **Check environment variables**: Ensure all required variables are set
4. **Test health endpoint**: Visit `/health` to verify the server is running

### Frontend Blank Page Issues

1. **Check console errors**: Open browser dev tools and check for JavaScript errors
2. **Verify API configuration**: Ensure `frontend/src/config/api.js` has correct backend URL
3. **Check Redux store**: Verify all slices are using the correct API endpoints
4. **Test API connectivity**: Ensure frontend can reach backend endpoints

### Common Issues

1. **CORS Errors**: Backend is configured to accept requests from the frontend URL
2. **Authentication Issues**: Check JWT token handling and localStorage
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **Build Failures**: Check Vercel build logs for dependency issues

## 🔄 Redeployment

### Backend Changes
```bash
cd backend
vercel --prod
```

### Frontend Changes
```bash
cd frontend
vercel --prod
```

## 📊 Monitoring

- **Backend Logs**: Check Vercel Function Logs for API debugging
- **Frontend Performance**: Use Vercel Analytics
- **Database**: Monitor MongoDB Atlas performance
- **Errors**: Check browser console and Vercel deployment logs

## 🔐 Security Notes

- Never commit sensitive environment variables
- Use strong JWT secrets
- Enable MongoDB Atlas security features
- Keep dependencies updated
- Monitor for security vulnerabilities

## 🎉 Success Indicators

✅ **Backend Working**: Health endpoint returns `{"message": "Server is running"}`
✅ **Frontend Loading**: Homepage displays without errors
✅ **API Connectivity**: Frontend can fetch data from backend
✅ **Authentication**: Login/Register functionality works
✅ **Database**: Products and user data loads correctly
