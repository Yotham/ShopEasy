import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // Ensure the path is corrected

function RegistrationForm() {
    const { register } = useAuth();
    const navigation = useNavigation();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        heightFeet: '5', // Splitting height into two fields for feet and inches
        heightInches: '0',
        weight: '',
        gender: 'Male',
        goal: 'Maintain Weight',
        age: ''
    });

    const handleChange = (name, value) => {
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Conversions
        const heightInCm = ((userData.heightFeet *12) + userData.heightInches)* 2.54;
        const weightInKg = userData.weight * 0.453592;
        
        // BMR Calculation using userData.age
        let bmr;
        if (userData.gender === "Male") {
            bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * userData.age);
        } else if (userData.gender === "Female") {
            bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * userData.age);
        } else {  // For "Other" gender
            const bmrMale = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * userData.age);
            const bmrFemale = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * userData.age);
            bmr = (bmrMale + bmrFemale) / 2;
        }
    
        // Caloric Goal Calculation
        let caloricGoal;
        if (userData.goal === "Lose Weight") {
            caloricGoal = bmr - 500; // Subtract 500 calories for weight loss
        } else if (userData.goal === "Gain Weight") {
            caloricGoal = bmr + 500; // Add 500 calories for weight gain
        } else {
            caloricGoal = bmr; // Maintain current weight
        }
    
        // Prepare user data for registration
        const userRegistrationData = {
            username: userData.username,
            password: userData.password,
            height: heightInCm,
            weight: userData.weight,
            gender: userData.gender,
            goal: userData.goal,
            age: userData.age,
            bmr: bmr,
            caloricGoal: caloricGoal
        };
        try{
            await register(userRegistrationData);
            navigation.navigate('Home');
        }catch(error){
            console.error("Registration Error", error)
        }

    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={userData.username}
                onChangeText={(text) => handleChange('username', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={userData.password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry={true} // Hides the password input
            />
            <TextInput
                style={styles.input}
                placeholder="Height (Feet)"
                value={userData.heightFeet}
                onChangeText={(text) => handleChange('heightFeet', text)}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Height (Inches)"
                value={userData.heightInches}
                onChangeText={(text) => handleChange('heightInches', text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={userData.age}
                onChangeText={(text) => handleChange('age', text)}
                keyboardType="numeric" // Ensures numeric input for age
            />
            <TextInput
                style={styles.input}
                placeholder="Weight"
                value={userData.weight}
                onChangeText={(text) => handleChange('weight', text)}
                keyboardType="numeric" // Ensures numeric input for weight
            />
            <Picker
                selectedValue={userData.gender}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) =>
                    handleChange('gender', itemValue)
                }>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
            <Button title="Register" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20, // Consider the overall padding for the screen, not just the modal
    },
    form: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 10,
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 8,
      width: 300, // You might want to use a percentage or 'auto' for responsive design
      backgroundColor: '#f5f5f5',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 20, // elevation for Android shadow
    },
    label: {
      flexDirection: 'column',
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 10, // Assuming you want some space between labels
    },
    input: {
      padding: 5,
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
      fontSize: 14,
      marginBottom: 5, // To replicate 'gap' for inputs
    },
    inputFocus: {
      borderColor: '#007BFF',
      // React Native does not have a pseudo-class like ':focus', handling focus requires state management
    },
    submitButton: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#007BFF',
      borderRadius: 4,
      color: '#fff', // Color property is not used for background color in React Native
      fontSize: 14,
      textAlign: 'center', // Align text inside the button
      marginBottom: 10, // To replicate 'gap' for the button
    },
    submitButtonHover: {
      backgroundColor: '#0056b3', // Note: ':hover' is not supported, you might use Touchable opacity or similar for feedback
    },
});

export default RegistrationForm;
