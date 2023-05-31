// Get Elements Boxes
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const recipeSection = document.querySelector(".recipe-section")
const selectionH1 = document.querySelector(".selection-heading")

// Populate Dropdowns
getCuisines()
// getCategories()

function getCuisines() {
   fetch("http://localhost:3000/cuisines")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines))
}
// function getAreas() {
//    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
//       .then(r => r.json())
//       .then(cuisines => writeCuisinesToDbJson(cuisines))
// }

function renderCuisineOptions(cuisines) {
   cuisines.forEach(cuisine => {
      console.log(cuisine.name)
      const option = document.createElement("option")
      option.value = cuisine.name
      option.textContent = cuisine.name
      cuisineSelect.append(option)
   })
}

// function writeCuisinesToDbJson(cuisines) {
//    console.log("In write to dbjson ")
//    console.log(cuisines.meals[0].strArea)
//    cuisines.meals.forEach(cuisine => {
//       const obj = {
//          name: cuisine.strArea
//       }
//       console.log(obj)
//       fetch("http://localhost:3000/cuisines", {
//          method: "POST",
//          headers: {
//             "Content-Type": "application/json",
//          },
//          body: JSON.stringify(obj),
//       })
//    })
// }

function getCategories() {
   console.log("in getCategories")
   fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then(r => r.json())
      .then(categories => writeCategoriesToDbJson(categories))
}

function renderCategoryOptions(categories) {
   categories.meals.forEach(meal => {
      const option = document.createElement("option")
      option.value = meal.strCategory
      option.textContent = meal.strCategory
      categorySelect.append(option)
   })
}

function writeCategoryToDbJson(categories) {}

// Parse Ingredients and Measures from MealDB meal object
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

function writeToDbJson(recipe) {
   //create a recipe object from the recipe object as received from MealsDB
   //POST to db.json
   const recipeObj = {
      name: recipe.strMeal,
      cuisine: recipe.strArea,
      category: recipe.strCategory,
      image: recipe.strMealThumb,
      ingredients: parseIngredients(recipe),
      instructions: recipe.strInstructions,
      video: recipe.strYoutube,
   }
   console.log(recipeObj)
   // fetch("http://localhost:3000, configObj")
   // .then(r => r.json())
   // .then(data => console.log(data))
}
