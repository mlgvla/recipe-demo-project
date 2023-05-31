cuisineSelect.addEventListener("change", getMealsByCuisine)
categorySelect.addEventListener("change", getMealsByCategory)

function getMealsByCuisine(e) {
   const cuisine = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then(r => r.json())
      .then(meals => displayAllMeals(meals))
}

function getMealsByCategory(e) {
   const category = e.target.value
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(r => r.json())
      .then(meals => displayAllMeals(meals))
}
function displayAllMeals(meals) {
   recipeContainer.replaceChildren()

   selectionH1.textContent = cuisineSelect.value || categorySelect.value
   meals.meals.forEach(meal => {
      renderMealCard(meal)
   })
   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderMealCard(meal) {
   const id = meal.idMeal
   const mealTxt = meal.strMeal
   const mealImg = document.createElement("img")
   mealImg.addEventListener("click", e => getRecipe(e, id))
   mealImg.src = meal.strMealThumb
   recipeContainer.append(mealImg, mealTxt)
}

function getRecipe(e, id) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
}

function renderRecipeDetails(recipe) {
   console.log(recipe)

   let nameP = document.createElement("p")
   let cuisineP = document.createElement("p")
   let categoryP = document.createElement("p")
   let mealImg = document.createElement("img")
   let instructionsP = document.createElement("p")
   let ingredients = parseIngredients(recipe)
   console.log(ingredients)
   let ingredientPs = ingredients.map(ingredient => {
      let ingredientP = document.createElement("p")
      ingredientP.textContent = ingredient
      console.log(ingredientP)
      return ingredientP
   })
   console.log(ingredients)
   nameP.textContent = recipe.strMeal
   cuisineP.textContent = recipe.strArea
   categoryP.textContent = recipe.strCategory
   mealImg.src = recipe.strMealThumb
   instructionsP.textContent = recipe.strInstructions

   selectionH1.textContent = ""
   recipeContainer.replaceChildren()

   recipeContainer.append(
      mealImg,
      nameP,
      cuisineP,
      categoryP,
      ...ingredientPs,
      instructionsP
   )
}
