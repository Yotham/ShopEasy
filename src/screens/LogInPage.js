import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const LogInPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SHOPEASY</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                keyboardType="email-address"
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                secureTextEntry
            />
            <Button 
                title="Log In" 
                onPress={() => {/* Handle the login logic here */}}
            />
            {/* Optionally add a button to navigate to the Sign-Up page */}
            <Button 
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate('SignUpPage')}
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
