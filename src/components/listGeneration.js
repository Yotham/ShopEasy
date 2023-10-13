export function getRandomItems(data, caloricGoal, count = 10) {
    const allItems = [];

    for (const pageNumber in data) {
        const itemNames = Object.keys(data[pageNumber]);

        for (const name of itemNames) {
            const nutrition = data[pageNumber][name].Nutrition;
            
            console.log(`Checking item:  ${name}`);
            
            if (Object.keys(nutrition).length > 1 || (Object.keys(nutrition).length === 1 && !("None" in nutrition))) {
                
                const calories = (
                    (nutrition.ProteinPS * 4) +
                    (nutrition.CarbPS * 4) +
                    (nutrition.FatPS * 9)
                );
                
                console.log(`Item calories:  ${calories}`);

                // Ensure the calculated calories is not NaN
                if (!isNaN(calories)) {
                    allItems.push({ name, pageNumber, calories });
                } else {
                    console.log(`Calories for ${name} is NaN. Skipping...`);
                }
            }
        }
    }

    let m = allItems.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = allItems[m];
        allItems[m] = allItems[i];
        allItems[i] = t;
    }

    const selectedItems = [];
    let totalCalories = 0;

    for (const item of allItems) {
        if (selectedItems.length >= count) {
            break;
        }

        // Update this condition
        if (totalCalories + item.calories -25 <= caloricGoal) {
            totalCalories += item.calories;
            selectedItems.push(item);
        }
    }

    console.log(`Total selected calories: ${totalCalories}, caloric goal: ${caloricGoal}`);
    console.log(`Selected items: `, selectedItems);

    return selectedItems;
}

export default getRandomItems;
