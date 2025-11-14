# Deployment Guide for GitHub Pages

## Important Notes

**GitHub Pages can only host static files** - it cannot run your Node.js backend. You'll need to deploy the backend separately.

## Step 1: Deploy Backend First

Choose one of these free hosting options:

### Option A: Railway (Recommended - Easy)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `PORT` (Railway will set this automatically)
   - `SESSION_SECRET`
6. Railway will auto-detect Node.js and deploy
7. Copy your backend URL (e.g., `https://your-app.railway.app`)

### Option B: Render
1. Go to [render.com](https://render.com)
2. Sign up and create a new "Web Service"
3. Connect your GitHub repo
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables
7. Deploy and copy your backend URL

### Option C: Heroku
1. Install Heroku CLI
2. `cd backend`
3. `heroku create your-app-name`
4. Set environment variables: `heroku config:set DB_HOST=...`
5. `git push heroku main`
6. Copy your backend URL

## Step 2: Update Frontend for Production

1. **Update API URL in frontend**:

   Create a `.env.production` file in the `frontend` folder:
   ```env
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
   Replace with your actual backend URL.

2. **Update package.json for GitHub Pages**:

   Add this to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/project4"
   ```

3. **Update React Router for GitHub Pages**:

   In `frontend/src/App.js`, update the BrowserRouter:
   ```jsx
   <BrowserRouter basename="/project4">
   ```

## Step 3: Build Frontend

```bash
cd frontend
npm run build
```

This creates a `build` folder with production-ready files.

## Step 4: Deploy to GitHub Pages

### Method 1: Using gh-pages package (Recommended)

1. Install gh-pages:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Method 2: Manual Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Copy the `build` folder contents to a `docs` folder in your repo root

3. In GitHub repo settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs
   - Save

## Step 5: Update CORS on Backend

Make sure your backend allows requests from your GitHub Pages URL:

In `backend/server.js`, update CORS:
```js
app.use(cors({
    origin: ['http://localhost:3000', 'https://yourusername.github.io'],
    credentials: true
}));
```

## Step 6: Test Everything

1. Visit your GitHub Pages URL
2. Test registration
3. Test login
4. Test all features

## Troubleshooting

- **404 errors on refresh**: Make sure you set `basename` in BrowserRouter
- **API calls failing**: Check CORS settings and API URL
- **Sessions not working**: Ensure `withCredentials: true` is set and CORS allows credentials

## Alternative: Use Vercel/Netlify Instead

These platforms are easier for React apps:

### Vercel:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build command: `cd frontend && npm install && npm run build`
5. Set output directory: `frontend/build`
6. Add environment variable: `REACT_APP_API_URL=your-backend-url`
7. Deploy

### Netlify:
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import from Git
4. Build command: `cd frontend && npm install && npm run build`
5. Publish directory: `frontend/build`
6. Add environment variable: `REACT_APP_API_URL=your-backend-url`
7. Deploy

