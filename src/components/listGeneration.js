export function getRandomItems(data, count = 10) {
    // Create an array of all item names and their associated page numbers
    const allItems = [];
    for (const pageNumber in data) {
        const itemNames = Object.keys(data[pageNumber]);
        for (const name of itemNames) {
            // Ensure the item's nutrition does not contain "None"
            const nutrition = data[pageNumber][name].Nutrition;
            if (!nutrition["None"]) {
                allItems.push({ name, pageNumber });
            }
        }
    }

    // Shuffle the array
    let m = allItems.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = allItems[m];
        allItems[m] = allItems[i];
        allItems[i] = t;
    }

    // Return the desired number of items
    return allItems.slice(0, count);
}

export default getRandomItems