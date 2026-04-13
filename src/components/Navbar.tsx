import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold text-green-600">
            Smart Diet Planner
          </Link>

          <div className="flex space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/meals"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Meal Plan
            </Link>
            <Link
              to="/progress"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Progress
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
