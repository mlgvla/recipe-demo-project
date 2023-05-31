// Get Elements Boxes
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const recipeSection = document.querySelector(".recipe-section")
const selectionH1 = document.querySelector(".selection-heading")

// Put Fetches in a function and call from i.js

// Fetch Areas
fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
   .then(r => r.json())
   .then(areas => renderAreaOptions(areas))

function renderAreaOptions(areas) {
   areas.meals.forEach(meal => {
      const option = document.createElement("option")
      option.value = meal.strArea
      option.textContent = meal.strArea
      cuisineSelect.append(option)
   })
}

// Fetch Categories
fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
   .then(r => r.json())
   .then(categories => renderCategoryOptions(categories))

function renderCategoryOptions(categories) {
   categories.meals.forEach(meal => {
      const option = document.createElement("option")
      option.value = meal.strCategory
      option.textContent = meal.strCategory
      categorySelect.append(option)
   })
}

function parseIngredients(recipe) {
   const ingredientArray = []

   for (let i = 1; i < 21; i++) {
      let measure = recipe["strMeasure" + i.toString()]
      let ingredient = recipe["strIngredient" + i.toString()]
      if (ingredient === "" || ingredient === null) {
         ingredient = "" // replaces null value with a string for trim() method
         continue //don't include empty ingredient strings of null values
      }

      let ingredientString = measure.trim() + " " + ingredient.trim() // get rid of extra trailing spaces
      ingredientArray.push(ingredientString)
   }
   return ingredientArray
}
