import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const navigation = useNavigation();

  const { currentUser } = useAuth();
  const username = currentUser ? currentUser.username : null;

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [goal, setGoal] = useState('');

  const handleSave = () => {
    // Perform save operation here
    console.log('Saved!');
  };

  const toggleGenderModal = () => {
    setGenderModalVisible(!genderModalVisible);
  };

  const toggleGoalModal = () => {
    setGoalModalVisible(!goalModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whats new, {username}? </Text>
      <Text style={styles.inputLabel}>Age</Text>
    <TextInput
      style={styles.input}
      placeholder={currentUser ? currentUser.age.toString() : ''} // Convert age to string
      value={age}
      onChangeText={setAge}
      keyboardType="numeric"
    />

    <Text style={styles.inputLabel}>Height (cm)</Text>
    <TextInput
      style={styles.input}
      placeholder={currentUser ? currentUser.height.toString() : ''}
      value={height}
      onChangeText={setHeight}
      keyboardType="numeric"
    />

    <Text style={styles.inputLabel}>Weight (lbs)</Text>
    <TextInput
      style={styles.input}
      placeholder={currentUser ? currentUser.weight.toString() : ''}
      value={weight}
      onChangeText={setWeight}
      keyboardType="numeric"
    />

    <TouchableOpacity style={styles.input} onPress={toggleGoalModal}>
      <Text>{goal || (currentUser ? currentUser.goal : '')}</Text>
    </TouchableOpacity>

    <Modal visible={goalModalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={toggleGoalModal} />
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalItem} onPress={() => { setGoal('Gain Weight'); toggleGoalModal(); }}>
            <Text>Gain Weight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => { setGoal('Lose Weight'); toggleGoalModal(); }}>
            <Text>Lose Weight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem} onPress={() => { setGoal('Maintain Weight'); toggleGoalModal(); }}>
            <Text>Maintain Weight</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    <Button title="Save" onPress={handleSave} />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingBottom: 150,
    justifyContent: 'flex-start',
    fontFamily: 'AvenirNextCondensed-Heavy',
    fontSize: 40,
    marginBottom: 20,
  },  
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Settings;
