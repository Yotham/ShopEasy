import React, { useState } from 'react';
import Data from '../Data/data.json';
import getRandomItems from '../components/ListGeneration';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';

const GenerateScreen = () => {
    const [randomItems, setRandomItems] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleGenerate = () => {
        const items = getRandomItems(Data, 1000);
        const itemObjects = items.map(item => {
            const productData = Data[item.pageNumber][item.name];
            return {
                name: item.name,
                link: productData.link,
                servingSize: productData.Nutrition["servingSize"],
                numServings: productData.Nutrition["numServings"],
                caloriesPS: productData.Nutrition["CaloriesPS"],
                FatPS: productData.Nutrition["FatPS"],
                CarbPS: productData.Nutrition["CarbPS"],
                ProteinPS: productData.Nutrition["ProteinPS"],
                count: item.count
            };
        });
        setRandomItems(itemObjects);
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
                    <ScrollView>
                        {randomItems.map((item, index) => (
                            <View key={index} style={styles.item}>
                                <Text style={styles.itemText}>
                                    {item.name}, Amount: {item.count}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
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
