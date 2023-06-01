cuisineSelect.addEventListener("change", getMealsByCuisine)
categorySelect.addEventListener("change", getMealsByCategory)

const recipeObjs = []

function getMealsByCuisine(e) {
   const cuisine = e.target.value
   const filteredRecipes = recipeObjs.filter(
      recipe => recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
   )
   displayAllRecipes(filteredRecipes)
}

function getMealsByCategory(e) {
   const category = e.target.value
   const filteredRecipes = recipeObjs.filter(
      recipe => recipe.category.toLowerCase() === category.toLowerCase()
   )
   displayAllRecipes(filteredRecipes)
}

function displayAllRecipes(recipes) {
   recipeContainer.replaceChildren()
   selectionH1.textContent = cuisineSelect.value || categorySelect.value
   recipes.forEach(recipe => {
      renderRecipeCard(recipe)
   })
   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderRecipeCard(recipe) {
   let cardDiv = document.createElement("div")
   cardDiv.classList.add("card")

   let titleH3 = document.createElement("h3")
   titleH3.classList.add("card-title")
   titleH3.textContent = recipe.name

   const id = recipe.id

   let recipeImg = document.createElement("img")
   recipeImg.classList.add("card-image")
   recipeImg.src = recipe.image
   recipeImg.addEventListener("click", () => getRecipe(id))

   cardDiv.append(recipeImg, titleH3)
   recipeContainer.append(cardDiv)
}

function getRecipe(id) {
   const recipe = recipeObjs.find(recipe => recipe.id === id)
   if (recipe) {
      renderRecipeDetails(recipe)
   } else {
      return "Recipe Not Found" // do a try/catch for this error
   }
}

function renderRecipeDetails(recipe) {
   let nameP = document.createElement("p")
   nameP.textContent = recipe.name

   let cuisineP = document.createElement("p")
   cuisineP.textContent = recipe.cuisine

   let categoryP = document.createElement("p")
   categoryP.textContent = recipe.category

   let recipeImg = document.createElement("img")
   recipeImg.src = recipe.image

   let ingredientPs = recipe.ingredients.map(ingredient => {
      let ingredientP = document.createElement("p")
      ingredientP.textContent = ingredient
      return ingredientP
   })

   let instructionsP = document.createElement("p")
   instructionsP.textContent = recipe.instructions

   let videoLink = document.createElement("a")
   videoLink.href = recipe.video
   videoLink.textContent = `Video for ${recipe.name}`


   selectionH1.textContent = ""
   recipeContainer.replaceChildren()

   recipeContainer.append(
      recipeImg,
      nameP,
      cuisineP,
      categoryP,
      ...ingredientPs,
      instructionsP,
      videoLink
   )
}
