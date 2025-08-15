# Vercel Deployment Guide

This guide will help you deploy your E-Commerce Full Stack App to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB database at [mongodb.com](https://mongodb.com)
3. **GitHub Repository**: Push your code to GitHub

## Environment Variables Setup

### Backend Environment Variables (in Vercel Dashboard)

Go to your Vercel project settings → Environment Variables and add:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URL=https://your-vercel-app-name.vercel.app
NODE_ENV=production
```

### Frontend Environment Variables (in Vercel Dashboard)

```
REACT_APP_API_URL=https://your-vercel-app-name.vercel.app/api
REACT_APP_FRONTEND_URL=https://your-vercel-app-name.vercel.app
```

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your E-Commerce app

### 2. Configure Build Settings

Vercel will automatically detect the configuration from `vercel.json`, but you can verify:

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: `npm run install-all`

### 3. Set Environment Variables

Add all the environment variables listed above in the Vercel dashboard.

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Project Structure for Vercel

```
├── vercel.json              # Main Vercel configuration
├── backend/
│   ├── api/
│   │   └── index.js         # Serverless API entry point
│   ├── vercel.json          # Backend-specific config
│   └── server.js            # Original server (for local dev)
├── frontend/
│   ├── src/
│   │   └── config/
│   │       └── api.js       # API configuration
│   └── package.json         # Frontend dependencies
└── package.json             # Root package.json
```

## API Endpoints

After deployment, your API will be available at:
- `https://your-app-name.vercel.app/api/auth/*`
- `https://your-app-name.vercel.app/api/products/*`
- `https://your-app-name.vercel.app/api/cart/*`
- `https://your-app-name.vercel.app/api/orders/*`

## Frontend Configuration

The frontend will automatically use the correct API URL based on the environment:
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-app-name.vercel.app/api`

## Troubleshooting

### Common Issues

1. **MongoDB Connection**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
2. **CORS Issues**: The backend is configured to accept requests from the frontend URL
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Failures**: Check the build logs in Vercel dashboard

### Local Development

For local development, use:
```bash
npm run dev
```

This will start both frontend and backend servers.

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update environment variables with the new domain

## Monitoring

- Use Vercel Analytics to monitor performance
- Check Function Logs for API debugging
- Monitor MongoDB Atlas for database performance

## Security Notes

- Never commit sensitive environment variables
- Use strong JWT secrets
- Enable MongoDB Atlas security features
- Consider using Vercel's Edge Functions for better performance
