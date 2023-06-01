// Get Elements Boxes
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const recipeSection = document.querySelector(".recipe-section")
const selectionH1 = document.querySelector(".selection-heading")

// Populate Dropdowns and RecipeObjs array
getCuisines()
getCategories()
getRecipes()

function getRecipes() {
   fetch("http://localhost:3000/recipes")
      .then(r => r.json())
      .then(recipes => {
         recipes.forEach(recipe => {
            recipeObjs.push(recipe)
         })
      })
}

function getCuisines() {
   fetch("http://localhost:3000/cuisines")
      .then(r => r.json())
      .then(cuisines => renderCuisineOptions(cuisines))
}

function getCategories() {
   fetch("http://localhost:3000/categories")
      .then(r => r.json())
      .then(categories => renderCategoryOptions(categories))
}

function renderCuisineOptions(cuisines) {
   cuisines.forEach(cuisine => {
      const option = document.createElement("option")
      option.value = cuisine.name
      option.textContent = cuisine.name
      cuisineSelect.append(option)
   })
}

function renderCategoryOptions(categories) {
   categories.forEach(category => {
      const option = document.createElement("option")
      option.value = category.name
      option.textContent = category.name
      categorySelect.append(option)
   })
}

// Parse Ingredients and Measures from MealDB meal object
// function parseIngredients(recipe) {
//    const ingredientArray = []

//    for (let i = 1; i < 21; i++) {
//       let measure = recipe["strMeasure" + i.toString()]
//       let ingredient = recipe["strIngredient" + i.toString()]
//       if (ingredient === "" || ingredient === null) {
//          ingredient = "" // replaces null value with a string for trim() method
//          continue //don't include empty ingredient strings of null values
//       }
//       let ingredientString = measure.trim() + " " + ingredient.trim() // get rid of extra trailing spaces
//       ingredientArray.push(ingredientString)
//    }
//    return ingredientArray
// }

// function writeToDbJson(recipe) {
//    //create a recipe object from the recipe object as received from MealsDB
//    //POST to db.json

//    const recipeObj = {
//       name: recipe.strMeal,
//       cuisine: recipe.strArea,
//       category: recipe.strCategory,
//       image: recipe.strMealThumb,
//       ingredients: parseIngredients(recipe),
//       instructions: recipe.strInstructions,
//       video: recipe.strYoutube,
//    }
//    fetch("http://localhost:3000/recipes", {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/json",
//       },
//       body: JSON.stringify(recipeObj),
//    })
//       .then(r => r.json())
//       .then(recipe => console.log(recipe))
// }

// FUNCTIONS FOR GETTING STUFFING FROM MEALS.DB
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

// function getCategories() {
//    console.log("in getCategories")
//    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
//       .then(r => r.json())
//       .then(categories => writeCategoriesToDbJson(categories))
// }

// function getAreas() {
//    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
//       .then(r => r.json())
//       .then(cuisines => writeCuisinesToDbJson(cuisines))
// }
