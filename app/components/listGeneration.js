export function getRandomItems(data, caloricGoal, minMeals = 10) {
    caloricGoal = caloricGoal * 7
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

    // Function to add item if it fits the calorie goal and meal constraints
    function addItemIfFits(item) {
        const potentialCalories = totalCalories + item.caloriesForAllServings;
        if (potentialCalories <= caloricGoal) {
            totalCalories = potentialCalories;
            return true;
        }
        return false;
    }

    // Select items and update counts
    for (const list of [lowerCalorieItems, higherCalorieItems, allItems]) {
        for (const item of list) {
            // Check if item is already selected
            const existingItem = selectedItems.find(si => si.name === item.name);
            if (existingItem) {
                // If count is less than 2, try to add another
                if (existingItem.count < 3 && addItemIfFits(item)) {
                    existingItem.count++;
                }
            } else {
                // If not selected yet, try to add first count
                if (selectedItems.length <= 19 && addItemIfFits(item)) {
                    selectedItems.push({ ...item, count: 1 });
                }
            }

            if (totalCalories >= caloricGoal - 100) {
                break;
            }
        }
    }

    // Convert selected items to tuples
    const selectedItemsTuples = selectedItems.map(item => ({
        ...item,
        count: item.count
    }));

    return selectedItemsTuples;
}

export default getRandomItems;