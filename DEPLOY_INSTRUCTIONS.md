# 🚀 Easy Deployment Instructions

Follow these steps in order. Don't skip ahead!

---

## 📦 PART 1: Push to GitHub

### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Click the **"+"** icon → **"New repository"**
3. Name it: `project4` (or whatever you want)
4. Make it **Public**
5. **DON'T** initialize with README
6. Click **"Create repository"**

### Step 2: Push Your Code
Open terminal in your project folder and run:

```bash
cd /Users/jessedeguzman/project4

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Vexyn Q&A Forum"

# Add your GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/project4.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## 🔧 PART 2: Deploy Backend (Railway - Easiest)

### Step 1: Sign Up for Railway
1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (easiest way)

### Step 2: Deploy Backend
1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Select your `project4` repository
4. Railway will detect it's a Node.js project

### Step 3: Configure Backend
1. Click on your deployed service
2. Go to **"Variables"** tab
3. Add these environment variables (click **"New Variable"** for each):

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=Sendmeal82!
   DB_NAME=jess_schema
   SESSION_SECRET=thisisprivate35
   ```

   **⚠️ IMPORTANT:** For production, you'll need a real MySQL database. Railway has a MySQL addon, or use a free service like:
   - **PlanetScale** (free tier): https://planetscale.com
   - **Railway MySQL addon**: Add it in Railway dashboard

4. Click **"Settings"** → **"Root Directory"** → Set to: `backend`

### Step 4: Get Your Backend URL
1. After deployment, Railway will give you a URL
2. It looks like: `https://vexyn-backend-production.up.railway.app`
3. **Copy this URL** - you'll need it next!

---

## 🎨 PART 3: Update Frontend Code

### Step 1: Update API URL
1. Open `frontend/src/api.js` in VS Code
2. Find this line:
   ```js
   : process.env.REACT_APP_API_URL || 'https://your-backend-url.herokuapp.com';
   ```
3. Replace `'https://your-backend-url.herokuapp.com'` with your Railway URL:
   ```js
   : process.env.REACT_APP_API_URL || 'https://vexyn-backend-production.up.railway.app';
   ```
   (Use your actual Railway URL!)

### Step 2: Update Backend CORS
1. Open `backend/server.js` in VS Code
2. Find the CORS section (around line 13)
3. Update it to include your GitHub Pages URL:
   ```js
   app.use(cors({
       origin: [
           'http://localhost:3000',
           'https://YOUR_USERNAME.github.io'  // Add this line
       ],
       credentials: true
   }));
   ```
   **Replace `YOUR_USERNAME` with your GitHub username!**

### Step 3: Update package.json for GitHub Pages
1. Open `frontend/package.json`
2. Add this line (replace `YOUR_USERNAME`):
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/project4",
   ```
3. Add deploy scripts (add these to the "scripts" section):
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```

### Step 4: Commit Changes
```bash
git add .
git commit -m "Update for production deployment"
git push
```

---

## 🌐 PART 4: Deploy Frontend to GitHub Pages

### Step 1: Install gh-pages
```bash
cd frontend
npm install --save-dev gh-pages
```

### Step 2: Deploy
```bash
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Deploy to GitHub Pages

### Step 3: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **"Settings"** (top menu)
3. Scroll to **"Pages"** (left sidebar)
4. Under **"Source"**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **"Save"**

### Step 4: Wait & Get Your URL
- Wait 1-2 minutes
- Your site will be at: `https://YOUR_USERNAME.github.io/project4`

---

## ✅ PART 5: Test Everything

1. Visit your GitHub Pages URL
2. Try registering a new account
3. Try logging in
4. Check if questions load
5. Try asking a question
6. Try posting an answer

**If something doesn't work:**
- Check browser console (F12) for errors
- Check Railway logs for backend errors
- Make sure backend URL in `api.js` is correct
- Make sure CORS includes your GitHub Pages URL

---

## 🎉 You're Done!

You now have:
- ✅ Code on GitHub
- ✅ Backend deployed on Railway
- ✅ Frontend deployed on GitHub Pages
- ✅ Everything working together!

**For your submission document, include:**
- GitHub repo: `https://github.com/YOUR_USERNAME/project4`
- Frontend: `https://YOUR_USERNAME.github.io/project4`
- Backend: `https://your-railway-url.railway.app`

---

## 🆘 Need Help?

**Common Issues:**

1. **"Cannot GET /"** → Backend not deployed or wrong URL
2. **CORS errors** → Update CORS in `server.js`
3. **404 on refresh** → Already handled in `App.js`
4. **Database errors** → Need to set up MySQL on Railway

**Quick Fixes:**
- Backend URL wrong? → Update `frontend/src/api.js`
- CORS errors? → Update `backend/server.js` CORS
- Not deploying? → Make sure `gh-pages` is installed

