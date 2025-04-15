import React, { useState } from 'react';
import './App.css';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    setRecipes([]);
    try {
      const response = await fetch(`${API_URL}${encodeURIComponent(ingredients)}`);
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError('No recipes found for those ingredients.');
      }
    } catch (err) {
      setError('Failed to fetch recipes.');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Worldwide Recipe Maker</h1>
      <p>Enter the ingredients you have (comma separated):</p>
      <input
        type="text"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        placeholder="e.g. chicken, rice, tomato"
      />
      <button onClick={fetchRecipes} disabled={loading || !ingredients.trim()}>
        {loading ? 'Searching...' : 'Generate Recipes'}
      </button>
      {error && <div className="error">{error}</div>}
      <div className="recipes">
        {recipes.map(recipe => (
          <div className="recipe-card" key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h2>{recipe.strMeal}</h2>
            <a href={`https://www.themealdb.com/meal/${recipe.idMeal}`} target="_blank" rel="noopener noreferrer">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
