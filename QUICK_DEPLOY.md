# 🚀 Quick Deployment Guide

Follow these steps **in order**. Don't skip ahead!

---

## 📍 STEP 1: Deploy Backend on Railway

### 1.1: Sign Up for Railway
1. Go to **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Click **"Deploy from GitHub repo"**
4. Sign in with your **GitHub account**
5. Authorize Railway to access your repos

### 1.2: Create New Project
1. Click **"New Project"** (top right)
2. Select **"Deploy from GitHub repo"**
3. Find and select your **`project4`** repository
4. Click **"Deploy Now"**

### 1.3: Configure the Service
1. Railway will start deploying automatically
2. Click on your service (the box that appeared)
3. Go to **"Settings"** tab
4. Find **"Root Directory"** → Set it to: `backend`
5. Click **"Save"**

### 1.4: Add MySQL Database (Important!)
**Option A: Use Railway's MySQL (Easiest)**
1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will create a MySQL database
4. Click on the MySQL service
5. Go to **"Variables"** tab
6. You'll see connection details like:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

**Option B: Use PlanetScale (Free Alternative)**
1. Go to **https://planetscale.com**
2. Sign up (free)
3. Create a database
4. Get connection details from dashboard

### 1.5: Set Environment Variables
1. Go back to your **backend service** (not MySQL)
2. Click **"Variables"** tab
3. Click **"+ New Variable"** for each:

   **If using Railway MySQL:**
   ```
   DB_HOST = (value from MYSQLHOST)
   DB_USER = (value from MYSQLUSER)
   DB_PASSWORD = (value from MYSQLPASSWORD)
   DB_NAME = (value from MYSQLDATABASE)
   PORT = (Railway sets this automatically, but you can use: 5001)
   SESSION_SECRET = thisisprivate35
   ```

   **If using PlanetScale or other:**
   ```
   DB_HOST = (your database host)
   DB_USER = (your database user)
   DB_PASSWORD = (your database password)
   DB_NAME = jess_schema
   PORT = 5001
   SESSION_SECRET = thisisprivate35
   ```

### 1.6: Set Up Database Tables
1. Railway will auto-deploy when you save variables
2. Wait for deployment to finish (green checkmark)
3. Click **"View Logs"** to see what's happening
4. Once deployed, you need to run the database setup

**To set up database tables:**
1. In Railway, go to your backend service
2. Click **"Deployments"** tab
3. Click the **"..."** menu on latest deployment
4. Select **"Open Shell"** or use **"Settings"** → **"Generate Domain"** to get your URL
5. You can also add a one-time command in Railway:
   - Go to **"Settings"** → **"Deploy"**
   - Add build command: `npm install`
   - Add start command: `npm run setup-db && npm start`

**OR manually run setup after first deploy:**
- Use Railway's shell feature to run: `npm run setup-db`

### 1.7: Get Your Backend URL
1. In Railway, go to your backend service
2. Click **"Settings"** tab
3. Scroll to **"Domains"**
4. Click **"Generate Domain"** (if not already generated)
5. Copy the URL (looks like: `https://vexyn-backend-production-xxxx.up.railway.app`)
6. **SAVE THIS URL** - you'll need it next!

---

## 📝 STEP 2: Update Frontend Code with Backend URL

### 2.1: Update api.js
1. Open `frontend/src/api.js` in VS Code
2. Find this line (around line 13):
   ```js
   : process.env.REACT_APP_API_URL || 'https://your-backend-url.herokuapp.com';
   ```
3. Replace `'https://your-backend-url.herokuapp.com'` with your **Railway backend URL**:
   ```js
   : process.env.REACT_APP_API_URL || 'https://vexyn-backend-production-xxxx.up.railway.app';
   ```
   (Use your actual Railway URL!)

### 2.2: Update Backend CORS
1. Open `backend/server.js` in VS Code
2. Find the CORS section (around line 13-16)
3. Update it to include your GitHub Pages URL. You'll need your GitHub username first.

   **For now, update it like this:**
   ```js
   app.use(cors({
       origin: [
           'http://localhost:3000',
           'https://YOUR_GITHUB_USERNAME.github.io'  // We'll update this after GitHub Pages
       ],
       credentials: true
   }));
   ```

   **Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!**

### 2.3: Commit and Push Changes
```bash
cd /Users/jessedeguzman/project4
git add .
git commit -m "Update for production - add backend URL"
git push
```

---

## 🌐 STEP 3: Deploy to GitHub Pages

### 3.1: Update package.json
1. Open `frontend/package.json` in VS Code
2. Add the `homepage` field (add it right after `"private": true,`):
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/project4",
   ```
   **Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username!**

3. Update the `scripts` section to add deploy commands:
   ```json
   "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   },
   ```

### 3.2: Install gh-pages
Open terminal and run:
```bash
cd frontend
npm install --save-dev gh-pages
```

### 3.3: Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Push it to GitHub
- Deploy to GitHub Pages

**Wait for it to finish!** You'll see a message like:
```
Published
```

### 3.4: Enable GitHub Pages (if not auto-enabled)
1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/project4`
2. Click **"Settings"** (top menu)
3. Scroll to **"Pages"** (left sidebar)
4. Under **"Source"**:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **"Save"**

### 3.5: Get Your Frontend URL
Your site will be at:
```
https://YOUR_GITHUB_USERNAME.github.io/project4
```

**Wait 1-2 minutes** for it to be live!

### 3.6: Update Backend CORS (Final Step)
Now that you have your GitHub Pages URL, update CORS one more time:

1. Open `backend/server.js`
2. Update CORS with your actual GitHub Pages URL:
   ```js
   app.use(cors({
       origin: [
           'http://localhost:3000',
           'https://YOUR_GITHUB_USERNAME.github.io'
       ],
       credentials: true
   }));
   ```

3. Commit and push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for GitHub Pages"
   git push
   ```

4. Railway will auto-redeploy with the new CORS settings

---

## ✅ STEP 4: Test Everything

1. Visit your GitHub Pages URL
2. Try registering a new account
3. Try logging in
4. Check if questions load
5. Try asking a question
6. Try posting an answer

**If something doesn't work:**
- Check browser console (F12) for errors
- Check Railway logs for backend errors
- Make sure backend URL in `api.js` matches Railway URL
- Make sure CORS includes your GitHub Pages URL

---

## 🎉 You're Done!

**Your URLs:**
- Frontend: `https://YOUR_USERNAME.github.io/project4`
- Backend: `https://your-railway-url.railway.app`
- GitHub Repo: `https://github.com/YOUR_USERNAME/project4`

**For your submission document:**
- Include all three URLs above
- Brief description of your project

---

## 🆘 Troubleshooting

**Backend not working?**
- Check Railway logs
- Make sure environment variables are set
- Make sure database is set up (run `npm run setup-db`)

**Frontend can't connect to backend?**
- Check `frontend/src/api.js` has correct Railway URL
- Check backend CORS includes GitHub Pages URL
- Check Railway backend is actually running (green status)

**404 errors on GitHub Pages?**
- Already handled in `App.js` with `basename`
- Make sure you deployed with `npm run deploy`

