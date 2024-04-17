function getRandomRecipes(data, caloricGoal) {
    caloricGoal = caloricGoal * 7; // Weekly caloric goal
    const allRecipes = [];

    // Iterate over each recipe and calculate total calories assuming 1 serving each
    Object.keys(data).forEach(name => {
        const nutrition = data[name].nutrition;
        if (!nutrition) return; // Skip if nutrition data is missing

        const calories = parseInt(nutrition["Total Calories"]);
        if (!isNaN(calories)) {
            allRecipes.push({ name, calories });
        }
    });

    // Shuffle the recipes
    let m = allRecipes.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = allRecipes[m];
        allRecipes[m] = allRecipes[i];
        allRecipes[i] = t;
    }

    const selectedRecipes = [];
    let totalCalories = 0;

    // Select recipes that fit within the caloric goal
    allRecipes.forEach(recipe => {
        const potentialCalories = totalCalories + recipe.calories;
        if (potentialCalories <= caloricGoal) {
            selectedRecipes.push({ ...recipe, count: 1 });
            totalCalories = potentialCalories;
        }
    });

    return selectedRecipes;
}

export default getRandomRecipes;
