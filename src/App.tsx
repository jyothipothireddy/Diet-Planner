import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import MealPlan from './pages/MealPlan';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

function App() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={isLoggedIn ? <ProfileSetup /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/meals"
          element={isLoggedIn ? <MealPlan /> : <Navigate to="/" />}
        />
        <Route
          path="/progress"
          element={isLoggedIn ? <Progress /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
