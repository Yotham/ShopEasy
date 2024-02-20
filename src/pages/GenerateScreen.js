import React, { useState, useEffect, useRef } from 'react';
import Data from '../Data/data.json';
import getRandomItems from '../components/ListGeneration';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Modal, SafeAreaView, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const GenerateScreen = () => {
    const [randomItems, setRandomItems] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { handleLogout, setCurrentUser } = useAuth();
    const navigation = useNavigation();

    const isMounted = useRef(true);

    useEffect(() => {

        return () => {
            isMounted.current = false;
            //navigation.navigate("LogIn");
        };
    }, []);

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

    const logout = async () => {
        try {
            await handleLogout();
        } catch (error) {
            if (isMounted.current) {
                console.error("Logout Error", error);
            }
        }
    };

    const Menu = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showMenu}
            onRequestClose={() => {
                setShowMenu(!showMenu);
            }}>
            <TouchableOpacity
                style={styles.menuOverlay}
                activeOpacity={1}
                onPressOut={() => setShowMenu(false)}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            navigation.navigate('Settings'); 
                            // Implement Account Settings functionality here
                            setShowMenu(false);
                        }}>
                        <Text style={styles.menuItemText}>Account Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                            logout();
                        }}>
                        <Text style={styles.menuItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="cog"
                size={20}
                color="black"
                style={styles.gearIcon}
                onPress={() => setShowMenu(true)}
            />
            <Menu />
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
        </SafeAreaView>
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
    gearIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    menuOverlay: {
        flex: 1,
        justifyContent: 'flex-start', // This positions the touchable overlay starting from the top
        alignItems: 'flex-end', // This aligns the menu container to the right
    },
    menuContainer: {
        marginTop: 150, 
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200, // Adjust based on content
    },
    menuItemText: {
        fontSize: 16,
    },
});

export default GenerateScreen;
