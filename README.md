# Vexyn - Q&A Forum Application

A full-stack Q&A forum application built with React, Node.js, Express, and MySQL. Users can register, login, ask questions, and provide answers across different programming categories.

## About Vexyn

**Vexyn** is a programming Q&A forum focused on web development technologies. The application organizes questions by categories such as JavaScript, React, Node.js, CSS, and Python.

## Architecture

This project follows a **3-Tier Architecture**:

1. **Data Layer**: MySQL database (`jess_schema`)
2. **Application Layer**: Node.js + Express.js REST API
3. **Presentation Layer**: React Single Page Application

## Features

- **User Authentication**
  - User registration with validation
  - Secure login with session management
  - Password hashing with bcrypt

- **Dashboard**
  - Display username and logout functionality
  - Category sidebar with scrollable menu
  - Filter questions by category
  - View all questions in chronological order
  - Question cards showing category, date, author, and answer count

- **Question Management**
  - Ask new questions with category selection
  - View question details
  - Post answers to questions
  - View all answers for each question

- **User Experience**
  - Responsive design with modern UI
  - Real-time error messages
  - Loading states
  - Form validation

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2
- bcryptjs (password hashing)
- express-session (session management)
- CORS
- dotenv (environment variables)

### Frontend
- React
- React Router DOM
- Axios (HTTP client)
- CSS3

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MySQL Server (v8.0 or higher)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project4
```

### 2. Database Setup

1. Make sure MySQL is running on your machine
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=schema_name
   PORT=5001
   SESSION_SECRET=your_random_secret_key_here
   ```
   Replace `your_mysql_password` with your actual MySQL root password and `your_random_secret_key_here` with a random string.

4. Set up the database:
   ```bash
   npm run setup-db
   ```
   This will create the database, tables, and insert sample data.

### 3. Backend Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5001`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

## Project Structure

```
project4/
├── backend/
│   ├── db.js                 # Database connection configuration
│   ├── server.js             # Express server and API routes
│   ├── setup-db.js           # Database setup script
│   ├── schema.sql            # Database schema and sample data
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (create this)
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js            # Main app component with routing
    │   ├── App.css           # Global styles
    │   ├── index.js          # React entry point
    │   └── pages/
    │       ├── Login.js      # Login page
    │       ├── Register.js   # Registration page
    │       ├── Dashboard.js  # Main dashboard
    │       ├── AskQuestion.js # Ask question page
    │       ├── QuestionDetail.js # Question detail page
    │       └── *.css         # Component styles
    └── package.json          # Frontend dependencies
```

## Database Schema

The database includes the following tables:

- **users**: Stores user credentials and information
- **categories**: Programming language categories (JavaScript, React, Node.js, CSS, Python)
- **questions**: User-submitted questions
- **answers**: Answers to questions

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/check-auth` - Check authentication status

### Categories
- `GET /api/categories` - Get all categories

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions?category_id=X` - Get questions by category
- `GET /api/questions/:id` - Get question details
- `POST /api/questions` - Create a new question (requires authentication)

### Answers
- `POST /api/answers` - Post an answer (requires authentication)

## Features Implementation

### Login Screen
- Username and password fields
- Error message display for invalid credentials
- Redirects to dashboard on successful login

### Registration Screen
- Username, password, and confirm password fields
- Terms and conditions checkbox
- Real-time validation with error messages
- Error messages appear next to invalid fields
- Errors clear when fields are corrected

### Dashboard
- App title (Vexyn)
- Username display
- Logout button
- Scrollable category menu on the left
- Questions displayed in chronological order (newest first)
- Filter questions by category
- Question cards showing:
  - Category badge with color
  - Question title
  - Author and date
  - Answer count
- Empty state when no questions exist

## Testing

1. **Test Registration**:
   - Go to `/register`
   - Create a new account
   - Verify you're redirected to dashboard

2. **Test Login**:
   - Logout and go to `/login`
   - Enter credentials
   - Verify successful login

3. **Test Categories**:
   - Click different categories in the sidebar
   - Verify questions filter correctly

4. **Test Questions**:
   - Click "Ask Question"
   - Fill out the form and submit
   - Verify question appears on dashboard

5. **Test Answers**:
   - Click on a question
   - Post an answer
   - Verify answer appears

## Deployment

### Backend Deployment
1. Set up a hosting service (Heroku, Railway, Render, etc.)
2. Configure environment variables on the hosting platform
3. Set up MySQL database (use a service like ClearDB, PlanetScale, or AWS RDS)
4. Update database connection in `.env`
5. Deploy backend code

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `build` folder to a hosting service (Netlify, Vercel, etc.)
3. Update API endpoints if backend URL changes

## Notes

- The application uses session-based authentication
- Passwords are hashed using bcrypt with 10 salt rounds
- CORS is configured to allow requests from `http://localhost:3000`
- The database includes sample data for demonstration

## Author

Jesse de Guzman

## License

This project is created for educational purposes.

