import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const VerifiedScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Set a timeout to navigate to the Dashboard screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate("Dashboard");
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>WealthPlus</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>

      {/* Tick mark and Verification message */}
      <View style={styles.verificationContainer}>
        <Text style={styles.tickMark}>✔</Text>
        <Text style={styles.verificationText}>Verification Complete!</Text>
        <Text style={styles.redirectText}>Redirecting you to your dashboard...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color
    marginBottom: 40,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
    justifyContent: 'center',
  },
  progressBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4CAF50', // Green color for the progress bar
  },
  verificationContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  tickMark: {
    fontSize: 50,
    color: '#4CAF50', // Green color for the tick mark
  },
  verificationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  redirectText: {
    fontSize: 16,
    color: '#888888',
    marginTop: 10,
  },
});

export default VerifiedScreen;