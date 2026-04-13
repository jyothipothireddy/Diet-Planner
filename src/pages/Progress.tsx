import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Navbar from '../components/Navbar';

// Dummy progress data
const weightData = [
  { date: 'Week 1', weight: 75 },
  { date: 'Week 2', weight: 74.5 },
  { date: 'Week 3', weight: 74 },
  { date: 'Week 4', weight: 73.5 },
  { date: 'Week 5', weight: 73 },
  { date: 'Week 6', weight: 72.8 },
];

const calorieData = [
  { day: 'Mon', calories: 2100 },
  { day: 'Tue', calories: 2200 },
  { day: 'Wed', calories: 1950 },
  { day: 'Thu', calories: 2150 },
  { day: 'Fri', calories: 2300 },
  { day: 'Sat', calories: 2000 },
  { day: 'Sun', calories: 2100 },
];

function Progress() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Progress Tracker</h1>
          <p className="text-gray-600 mt-2">Monitor your fitness journey</p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Weight Lost</h3>
            <p className="text-4xl font-bold">2.2 kg</p>
            <p className="text-green-100 text-sm mt-2">Keep it up!</p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Days Active</h3>
            <p className="text-4xl font-bold">42</p>
            <p className="text-blue-100 text-sm mt-2">You're on a streak!</p>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Meals Tracked</h3>
            <p className="text-4xl font-bold">126</p>
            <p className="text-orange-100 text-sm mt-2">Great consistency!</p>
          </div>
        </div>

        {/* Weight Progress Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weight Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[70, 76]} />
              <Tooltip />
              <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Calorie Intake Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Calorie Intake</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">You're doing amazing!</h2>
          <p className="text-lg">Keep pushing forward. Every small step counts towards your goal.</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;
