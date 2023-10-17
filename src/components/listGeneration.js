export function getRandomItems(data, caloricGoal, minMeals = 10) {
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

    const selectedItems = [];
    let totalCalories = 0;
    let totalServings = 0;

    for (const item of allItems) {
        if (selectedItems.length < minMeals && totalCalories + item.caloriesForAllServings <= caloricGoal + 25) {
            totalCalories += item.caloriesForAllServings;
            totalServings += item.numServings;
            selectedItems.push(item);
        }
    }

    // If servings are less than 21, try to add more items to meet the calorie goal
    if (totalServings < 21) {
        for (const item of allItems) {
            if (!selectedItems.includes(item) && totalCalories + item.caloriesForAllServings <= caloricGoal + 25) {
                totalCalories += item.caloriesForAllServings;
                totalServings += item.numServings;
                selectedItems.push(item);
            }
        }
    }
    console.log(`Total selected calories: ${totalCalories}, caloric goal: ${caloricGoal}`);
    console.log(`Selected items: `, selectedItems);
    return selectedItems;
}

export default getRandomItems;
