#!/bin/bash

echo "🚀 Starting Vercel Deployment Setup..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin &> /dev/null; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
    echo "   git push -u origin main"
    exit 1
fi

echo "✅ Prerequisites check passed!"

echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Add Vercel deployment configuration'"
echo "   git push"
echo ""
echo "2. Go to https://vercel.com and create a new project"
echo "3. Import your GitHub repository"
echo "4. Set up environment variables in Vercel dashboard:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET"
echo "   - JWT_EXPIRE"
echo "   - COOKIE_EXPIRE"
echo "   - FRONTEND_URL"
echo "   - REACT_APP_API_URL"
echo ""
echo "5. Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"

echo "🎉 Setup complete! Happy deploying!"
