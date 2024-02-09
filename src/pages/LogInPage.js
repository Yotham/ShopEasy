import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Ensure the path is corrected
import { useNavigation } from '@react-navigation/native';

const LogInPage = () => {
    const { login } = useAuth(); // Destructure login from your context
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    // Function to handle updates to the username
    const handleUsernameChange = (username) => {
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            username
        }));
    };

    // Function to handle updates to the password
    const handlePasswordChange = (password) => {
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            password
        }));
    };

    // Handle the login logic
    const handleLogin = async () => {
        try {
            const result = await login(credentials);
            if (result.success) {
                // Navigation to 'Home' only occurs on successful login
                navigation.navigate('Home');
                alert('Logged in successfully!');
            } else {
                // Display an error message if login was not successful
                alert(result.message);
            }
        } catch (error) {
            // This catch block might not be necessary if all errors are handled within the login function
            console.error('Unexpected error during login:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SHOPEASY</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                keyboardType="email-address"
                value={credentials.username}
                onChangeText={handleUsernameChange} // Update the username in state
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry
                value={credentials.password}
                onChangeText={handlePasswordChange} // Update the password in state
            />
            <Button 
                title="Log In" 
                onPress={handleLogin} // Call the handleLogin when pressed
            />
            <Button 
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    title: {
        paddingBottom: 150,
        justifyContent: 'flex-start',
        fontFamily: 'AvenirNextCondensed-Heavy',
        fontSize: 40,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});

export default LogInPage;
