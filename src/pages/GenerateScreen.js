import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const GenerateScreen = () => {
    const [randomItems, setRandomItems] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleGenerate = () => {
        // Insert your generate logic here
        // For demonstration, let's assume random items are generated
        const items = ["ryan kerr", "ryan kerrrr", "ryan kerrrrrrr"];
        setRandomItems(items);
        setIsGenerated(true);
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={[styles.generateButton, isPressed && styles.generateButtonPressed]}
                underlayColor="lightblue" // Change the background color when pressed
                onPress={handleGenerate}
                onHideUnderlay={() => setIsPressed(false)}
                onShowUnderlay={() => setIsPressed(true)}
            >
                <Text style={styles.generateButtonText}>Generate</Text>
            </TouchableHighlight>

            {isGenerated && (
                <View style={styles.itemContainer}>
                    {randomItems.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    generateButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    generateButtonPressed: {
        backgroundColor: 'lightblue',
    },
    generateButtonText: {
        color: 'white',
        fontSize: 18,
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    item: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default GenerateScreen;
