# Quick GitHub Pages Setup Guide

## Important: You Need TWO Deployments

1. **Backend** → Deploy to Railway/Render/Heroku (can't use GitHub Pages)
2. **Frontend** → Deploy to GitHub Pages

## Quick Steps:

### 1. Deploy Backend First (5 minutes)

**Option: Railway (Easiest)**
1. Go to https://railway.app → Sign up with GitHub
2. "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add these environment variables:
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user  
   DB_PASSWORD=Sendmeal82!
   DB_NAME=jess_schema
   SESSION_SECRET=any_random_string
   ```
5. Copy your backend URL (e.g., `https://vexyn-backend.railway.app`)

### 2. Update Frontend for Production

1. **Update `frontend/src/api.js`**:
   - Replace `'https://your-backend-url.herokuapp.com'` with your actual Railway/Render URL

2. **Update `frontend/package.json`**:
   Add this line (replace `yourusername` with your GitHub username):
   ```json
   "homepage": "https://yourusername.github.io/project4",
   ```

3. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

4. **Add deploy script to `frontend/package.json`**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

5. **Update backend CORS** in `backend/server.js`:
   ```js
   app.use(cors({
       origin: [
           'http://localhost:3000',
           'https://yourusername.github.io'
       ],
       credentials: true
   }));
   ```

### 3. Deploy Frontend to GitHub Pages

```bash
cd frontend
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Deploy to GitHub Pages

### 4. Enable GitHub Pages

1. Go to your GitHub repo → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` → `/ (root)`
4. Save

Your site will be at: `https://yourusername.github.io/project4`

## Test Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed to GitHub Pages
- [ ] Can register new account
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can ask questions
- [ ] Can post answers

## Common Issues

**404 on page refresh**: Make sure `basename` is set in BrowserRouter (already done in App.js)

**API calls failing**: 
- Check `frontend/src/api.js` has correct backend URL
- Check backend CORS allows your GitHub Pages URL

**Sessions not working**: 
- Make sure backend CORS has `credentials: true`
- Check backend URL is correct in `api.js`

