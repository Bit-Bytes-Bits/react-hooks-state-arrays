import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });
  // console.log(selection)

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    /* Here, we're using the spread operator (...) to make a copy of our foods array, 
    and insert it into a new array. We're also adding the newly generated food returned by 
    the getNewSpicyFood function at the end of the array */
    const newFoodArray = [...foods, newFood];

    setFoods(newFoodArray);
    // console.log(newFood);
  }

  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // function handleClick(id) {
  //   const newFoodArray = foods.filter((food) => food.id !== id);
  //   setFoods(newFoodArray);
  // }

  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 };
      } else {
        return food;
      }
    });
    setFoods(newFoodArray);
  }

  function handleFilterChange(e){
    setFilterBy(e.target.value)
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
