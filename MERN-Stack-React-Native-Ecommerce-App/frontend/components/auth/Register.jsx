import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  // State variables for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle registration
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.6:3000/api/register', {
        username,
        email,
        location,
        password,
      });

      if (response.status === 200) {
        Alert.alert('Success', response.data.message); // Display success message
        navigation.navigate('Home'); // Navigate to Home or another screen
      } else {
        Alert.alert('Error', 'Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Error', 'Unable to register. Please check your network or server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Location Input */}
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Register Button */}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
