import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "OTPScreen">;

const OTPScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [otp, setOtp] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  // const navigation = useNavigation();

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 0.75,
      duration: 1000, // 1 second
      useNativeDriver: false,
    }).start();
  }, []);

  const validateOTP = () => {
    if (otp.length < 6) {
      alert('OTP must be 6 digits.');
      return false;
    }

    return true;
  };

  const handleProceed = () => {
    if (validateOTP()) {
      // Navigate to the next screen, e.g., "Dashboard" or "HomeScreen"
    //   navigation.navigate('NextScreen');  // Replace 'NextScreen' with the actual screen name
        navigation.navigate("VerifiedScreen");
  }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Wealthplus</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      {/* OTP Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>sent to your phone number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7D4CED',
    textAlign: 'center',
    marginBottom: 40,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7D4CED',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OTPScreen;
