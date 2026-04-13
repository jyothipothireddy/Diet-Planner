import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

function Dashboard() {
  // Get user data from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { gender, weight, height, age } = profile;
    if (!weight || !height || !age) return 0;

    if (gender === 'male') {
      return Math.round(10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5);
    } else {
      return Math.round(10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161);
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers: any = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };
    return Math.round(bmr * (activityMultipliers[profile.activityLevel] || 1.55));
  };

  const bmr = calculateBMR();
  const tdee = calculateTDEE();

  // Dummy data for calorie distribution chart
  const calorieData = [
    { name: 'Carbs', value: 50, color: '#10b981' },
    { name: 'Protein', value: 30, color: '#3b82f6' },
    { name: 'Fat', value: 20, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600">Here's your daily nutrition overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">Basal Metabolic Rate</h3>
            <p className="text-3xl font-bold text-green-600">{bmr}</p>
            <p className="text-gray-500 text-sm">calories/day</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">Daily Calorie Goal</h3>
            <p className="text-3xl font-bold text-blue-600">{tdee}</p>
            <p className="text-gray-500 text-sm">calories/day</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm mb-2">Goal</h3>
            <p className="text-3xl font-bold text-orange-600 capitalize">
              {profile.goal || 'Maintain'}
            </p>
            <p className="text-gray-500 text-sm">Weight</p>
          </div>
        </div>

        {/* Calorie Distribution Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recommended Calorie Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={calorieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {calorieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/meals"
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">Meal Plans</h3>
            <p className="text-green-100">View personalized meal recommendations</p>
          </Link>

          <Link
            to="/progress"
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-blue-100">Monitor your fitness journey</p>
          </Link>

          <Link
            to="/settings"
            className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg p-6 text-white hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-orange-100">Update your profile and preferences</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
