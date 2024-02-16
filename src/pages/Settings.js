import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

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
      <Text>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (lbs)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.input} onPress={toggleGenderModal}>
        <Text>{gender || 'Select Gender'}</Text>
      </TouchableOpacity>
      <Modal visible={genderModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={toggleGenderModal} />
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalItem} onPress={() => { setGender('Male'); toggleGenderModal(); }}>
              <Text>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => { setGender('Female'); toggleGenderModal(); }}>
              <Text>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.input} onPress={toggleGoalModal}>
        <Text>{goal || 'Select Goal'}</Text>
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
