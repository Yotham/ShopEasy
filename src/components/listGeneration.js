export function getRandomItems(data, caloricGoal, minMeals = 10) {
    caloricGoal = caloricGoal*7
    const allItems = [];

    for (const pageNumber in data) {
        const itemNames = Object.keys(data[pageNumber]);

        for (const name of itemNames) {
            const nutrition = data[pageNumber][name].Nutrition;
            
            if (Object.keys(nutrition).length > 1 || (Object.keys(nutrition).length === 1 && !("None" in nutrition))) {
                
                const numServings = nutrition.numServings || 1;
                const caloriesForAllServings = numServings * (
                    (nutrition.ProteinPS * 4) +
                    (nutrition.CarbPS * 4) +
                    (nutrition.FatPS * 9)
                );

                if (!isNaN(caloriesForAllServings)) {
                    allItems.push({ name, pageNumber, caloriesForAllServings, numServings });
                }
            }
        }
    }

    // Shuffle the items
    let m = allItems.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = allItems[m];
        allItems[m] = allItems[i];
        allItems[i] = t;
    }

    // Segment items into lower and higher calorie lists
    const medianCalories = caloricGoal / minMeals;
    const lowerCalorieItems = allItems.filter(item => item.caloriesForAllServings <= medianCalories);
    const higherCalorieItems = allItems.filter(item => item.caloriesForAllServings > medianCalories);

    const selectedItems = [];
    let totalCalories = 0;

    // Initial selection from lower calorie items
    for (const item of lowerCalorieItems) {
        if (selectedItems.length < minMeals - 2 && totalCalories + item.caloriesForAllServings <= caloricGoal) {
            totalCalories += item.caloriesForAllServings;
            selectedItems.push(item);
        }
    }

    // Fill up to minMeals with higher calorie items
    for (const item of higherCalorieItems) {
        if (selectedItems.length < minMeals && totalCalories + item.caloriesForAllServings <= caloricGoal) {
            totalCalories += item.caloriesForAllServings;
            selectedItems.push(item);
        }
    }

    // Ensure caloric constraints: No more than caloricGoal, and no more than 100 below caloricGoal
    for (const item of allItems) {
        if (!selectedItems.includes(item) && totalCalories + item.caloriesForAllServings <= caloricGoal) {
            totalCalories += item.caloriesForAllServings;
            selectedItems.push(item);
        }
        if (totalCalories >= caloricGoal - 100) {
            break;
        }
    }

    // Return the selected items
    return selectedItems;
}

export default getRandomItems;
