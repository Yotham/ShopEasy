import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const GenerateScreen = () => {
    const [randomItems, setRandomItems] = useState([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { handleLogout } = useAuth();
    const navigation = useNavigation();

    const handleGenerate = () => {
        const items = ["ryan kerr", "ryan kerrrr", "ryan kerrrrrrr"];
        setRandomItems(items);
        setIsGenerated(true);
    };

    const logout = async () => {
        try {
            await handleLogout();
        } catch (error) {
            console.error("Logout Error", error);
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
                            console.log('Account Settings Pressed');
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
                    {randomItems.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    ))}
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
