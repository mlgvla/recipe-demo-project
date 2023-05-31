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
      //writeToDbJson
   })
   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderMealCard(meal) {
   let cardDiv = document.createElement("div")
   cardDiv.classList.add("card")

   let titleH3 = document.createElement("h3")
   titleH3.classList.add("card-title")
   titleH3.textContent = meal.strMeal

   const id = meal.idMeal

   let mealImg = document.createElement("img")
   mealImg.classList.add("card-image")
   mealImg.src = meal.strMealThumb
   mealImg.addEventListener("click", e => getRecipe(e, id))

   cardDiv.append(mealImg, titleH3)
   recipeContainer.append(cardDiv)
}

function getRecipe(e, id) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(r => r.json())
      .then(recipe => writeToDbJson(recipe.meals[0]))
      //renderRecipeDetails(recipe.meals[0]) - put this back after testing
}

function renderRecipeDetails(recipe) {
   console.log(recipe)
   let nameP = document.createElement("p")
   let cuisineP = document.createElement("p")
   let categoryP = document.createElement("p")
   let mealImg = document.createElement("img")
   let instructionsP = document.createElement("p")
   let ingredients = parseIngredients(recipe)

   let ingredientPs = ingredients.map(ingredient => {
      let ingredientP = document.createElement("p")
      ingredientP.textContent = ingredient
      return ingredientP
   })

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
