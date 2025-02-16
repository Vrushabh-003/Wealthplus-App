import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RNSimData from 'react-native-sim-data';  // Import the library to fetch SIM data

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const PhoneNumberScreen = () => {
  const Navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState("9940615334");
  const [progress, setProgress] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the phone number from the SIM card (if available)
    try {
      const simInfo = RNSimData.getSimInfo();  // Fetch SIM data
      console.log(simInfo);  // Log the result to inspect available properties

      // Check for the first SIM card's phone number
      if (simInfo && simInfo.phoneNumber0) {
        setPhoneNumber(simInfo.phoneNumber0);  // Set the phone number for the first SIM slot
      }
    } catch (error) {
      console.error("Error fetching phone number:", error);
    }

    // Animate progress bar
    Animated.timing(progress, {
      toValue: 0.25,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const validatePhoneNumber = () => {
    if (phoneNumber.length < 10) {
      alert("Phone number must be at least 10 digits.");
      return false;
    }
    Navigation.navigate("PANInputScreen");
    return true;
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Wealthplus</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter phone number</Text>
        <Text style={styles.subtitle}>linked to your PAN</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}  // Show the fetched phone number here
            onChangeText={setPhoneNumber}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={validatePhoneNumber}>
          <Text style={styles.buttonText}>Proceed →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FF",
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7D4CED",
    textAlign: "center",
    marginBottom: 40,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#7D4CED",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: "#555555",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#333333",
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PhoneNumberScreen;
