import { useState } from 'react';
import Navbar from '../components/Navbar';

// Dummy meal data
const mealDatabase = [
  // Breakfast
  { id: 1, name: 'Oatmeal with Berries', type: 'breakfast', calories: 350, carbs: 45, protein: 12, fat: 8 },
  { id: 2, name: 'Greek Yogurt Parfait', type: 'breakfast', calories: 280, carbs: 35, protein: 20, fat: 5 },
  { id: 3, name: 'Scrambled Eggs & Toast', type: 'breakfast', calories: 400, carbs: 30, protein: 25, fat: 18 },
  { id: 4, name: 'Smoothie Bowl', type: 'breakfast', calories: 320, carbs: 52, protein: 10, fat: 6 },

  // Lunch
  { id: 5, name: 'Grilled Chicken Salad', type: 'lunch', calories: 450, carbs: 25, protein: 40, fat: 20 },
  { id: 6, name: 'Quinoa Buddha Bowl', type: 'lunch', calories: 500, carbs: 60, protein: 18, fat: 15 },
  { id: 7, name: 'Turkey Sandwich', type: 'lunch', calories: 420, carbs: 45, protein: 28, fat: 12 },
  { id: 8, name: 'Vegetable Stir Fry', type: 'lunch', calories: 380, carbs: 50, protein: 15, fat: 10 },

  // Dinner
  { id: 9, name: 'Salmon with Broccoli', type: 'dinner', calories: 520, carbs: 20, protein: 45, fat: 28 },
  { id: 10, name: 'Chicken Breast & Rice', type: 'dinner', calories: 550, carbs: 55, protein: 50, fat: 12 },
  { id: 11, name: 'Pasta Primavera', type: 'dinner', calories: 480, carbs: 65, protein: 18, fat: 14 },
  { id: 12, name: 'Beef Stir Fry', type: 'dinner', calories: 600, carbs: 40, protein: 42, fat: 25 },

  // Snacks
  { id: 13, name: 'Apple with Almond Butter', type: 'snack', calories: 200, carbs: 25, protein: 6, fat: 10 },
  { id: 14, name: 'Protein Bar', type: 'snack', calories: 180, carbs: 20, protein: 15, fat: 7 },
  { id: 15, name: 'Mixed Nuts', type: 'snack', calories: 220, carbs: 8, protein: 8, fat: 18 },
];

function MealPlan() {
  const [meals, setMeals] = useState(generateRandomMealPlan());

  // Generate a random meal plan
  function generateRandomMealPlan() {
    const breakfast = mealDatabase.filter(m => m.type === 'breakfast');
    const lunch = mealDatabase.filter(m => m.type === 'lunch');
    const dinner = mealDatabase.filter(m => m.type === 'dinner');
    const snack = mealDatabase.filter(m => m.type === 'snack');

    return {
      breakfast: breakfast[Math.floor(Math.random() * breakfast.length)],
      lunch: lunch[Math.floor(Math.random() * lunch.length)],
      dinner: dinner[Math.floor(Math.random() * dinner.length)],
      snack: snack[Math.floor(Math.random() * snack.length)],
    };
  }

  // Handle refresh meal plan
  const handleRefresh = () => {
    setMeals(generateRandomMealPlan());
  };

  // Calculate total nutrition
  const totalCalories = meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories + meals.snack.calories;
  const totalProtein = meals.breakfast.protein + meals.lunch.protein + meals.dinner.protein + meals.snack.protein;
  const totalCarbs = meals.breakfast.carbs + meals.lunch.carbs + meals.dinner.carbs + meals.snack.carbs;
  const totalFat = meals.breakfast.fat + meals.lunch.fat + meals.dinner.fat + meals.snack.fat;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Today's Meal Plan</h1>
            <p className="text-gray-600 mt-2">Your personalized daily nutrition plan</p>
          </div>
          <button
            onClick={handleRefresh}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Refresh Plan
          </button>
        </div>

        {/* Daily Totals */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Totals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Calories</p>
              <p className="text-2xl font-bold text-green-600">{totalCalories}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Protein</p>
              <p className="text-2xl font-bold text-blue-600">{totalProtein}g</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Carbs</p>
              <p className="text-2xl font-bold text-orange-600">{totalCarbs}g</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Fat</p>
              <p className="text-2xl font-bold text-red-600">{totalFat}g</p>
            </div>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Breakfast */}
          <MealCard meal={meals.breakfast} mealType="Breakfast" color="green" />

          {/* Lunch */}
          <MealCard meal={meals.lunch} mealType="Lunch" color="blue" />

          {/* Dinner */}
          <MealCard meal={meals.dinner} mealType="Dinner" color="orange" />

          {/* Snack */}
          <MealCard meal={meals.snack} mealType="Snack" color="purple" />
        </div>
      </div>
    </div>
  );
}

// Meal Card Component
function MealCard({ meal, mealType, color }: any) {
  const colorClasses: any = {
    green: 'border-green-500 text-green-600',
    blue: 'border-blue-500 text-blue-600',
    orange: 'border-orange-500 text-orange-600',
    purple: 'border-gray-500 text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className={`text-sm font-semibold mb-2 ${colorClasses[color]}`}>{mealType}</h3>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{meal.name}</h2>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <p className="text-gray-600 text-xs">Calories</p>
          <p className="text-lg font-bold text-gray-800">{meal.calories}</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Protein</p>
          <p className="text-lg font-bold text-gray-800">{meal.protein}g</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Carbs</p>
          <p className="text-lg font-bold text-gray-800">{meal.carbs}g</p>
        </div>
        <div>
          <p className="text-gray-600 text-xs">Fat</p>
          <p className="text-lg font-bold text-gray-800">{meal.fat}g</p>
        </div>
      </div>
    </div>
  );
}

export default MealPlan;
