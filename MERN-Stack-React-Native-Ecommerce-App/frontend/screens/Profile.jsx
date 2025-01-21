import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import axios for API requests
import { COLORS } from '../../assets/constants';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Passwords must be at least 8 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  name: Yup.string().min(3, 'Invalid name').required('Required'),
  location: Yup.string()
    .min(4, 'Invalid Location address')
    .required('Required'),
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  // Function to handle registration API call
  const handleRegister = async (values) => {
    try {
      setIsLoading(true); // Set loading state to true while waiting for response

      const response = await axios.post(
        'http://localhost:3000/api/register', // Replace with your backend endpoint
        values
      );
      setResponseData(response.data); // Store response data if needed
      console.log('User registered successfully:', response.data);
      navigation.navigate('Home'); // Navigate to home screen on success
    } catch (error) {
      console.error('Registration failed:', error);
      Alert.alert('Error', 'Registration failed, please try again!');
    } finally {
      setIsLoading(false); // Set loading state to false after API call completes
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        source={require('../assets/images/bk.png')}
        style={{ width: '100%', height: 330 }}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={{ position: 'absolute', top: 20, left: 15 }}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon.ChevronLeft stroke="#7AA874" fill="#fff" width={26} height={32} />
      </TouchableOpacity>
      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: '#7AA874',
            marginTop: 2,
            alignSelf: 'center',
          }}
        >
          Sign up and start shopping
        </Text>
        <Formik
          initialValues={{ email: '', password: '', location: '', name: '' }}
          onSubmit={handleRegister} // Update to call handleRegister
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
            touched,
          }) => (
            <View>
              {/* Name Input */}
              <View style={{ marginTop: 12 }}>
                <View
                  style={{
                    backgroundColor: '#FAF3F0',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 8,
                  }}
                >
                  <Icon.User stroke="#7AA874" width={22} height={32} style={{ marginLeft: 12 }} />
                  <TextInput
                    placeholder="Enter Name"
                    placeholderTextColor="gray"
                    style={{ color: 'black' }}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                </View>
              </View>

              {/* Location Input */}
              <View style={{ marginTop: 30 }}>
                <View
                  style={{
                    backgroundColor: '#FAF3F0',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 8,
                  }}
                >
                  <Icon.MapPin stroke="#7AA874" width={22} height={32} style={{ marginLeft: 12 }} />
                  <TextInput
                    placeholder="Enter Location"
                    placeholderTextColor="gray"
                    style={{ color: 'black' }}
                    onChangeText={handleChange('location')}
                    onBlur={handleBlur('location')}
                    value={values.location}
                  />
                </View>
                {touched.location && errors.location && (
                  <Text style={{ color: 'red' }}>{errors.location}</Text>
                )}
              </View>

              {/* Email Input */}
              <View style={{ marginTop: 30 }}>
                <View
                  style={{
                    backgroundColor: '#FAF3F0',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 8,
                  }}
                >
                  <Icon.Mail stroke="#7AA874" width={22} height={32} style={{ marginLeft: 12 }} />
                  <TextInput
                    placeholder="Enter Email"
                    placeholderTextColor="gray"
                    style={{ color: 'black' }}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              </View>

              {/* Password Input */}
              <View
                style={{
                  backgroundColor: '#FAF3F0',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 8,
                  marginTop: 30,
                  borderColor: touched.password ? '#7AA874' : 'transparent',
                  borderWidth: 0.7,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon.Lock stroke="#7AA874" width={22} height={32} style={{ marginLeft: 12 }} />
                  <TextInput
                    style={{ color: 'black', marginLeft: 12 }}
                    placeholder="Enter Password"
                    placeholderTextColor="gray"
                    onBlur={() => setFieldTouched('password')}
                    onFocus={() => setFieldTouched('password')}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Icon.Eye stroke="#7AA874" width={22} height={32} />
                  ) : (
                    <Icon.EyeOff stroke="#7AA874" width={22} height={32} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}

              {/* Register Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: '#7AA874',
                  width: '100%',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                  height: 50,
                }}
                onPress={handleSubmit} // Trigger Formik submit
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? (
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Loading...</Text>
                ) : (
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                    R E G I S T E R
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: '#080202' }}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 16, color: '#080202' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
