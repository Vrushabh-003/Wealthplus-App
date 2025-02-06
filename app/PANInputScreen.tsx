import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const PANInputScreen = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the NavigationProp type here

  const [panNumber, setPanNumber] = useState("ABCDE1234H");
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 0.5,
      duration: 1000, // 1 second
      useNativeDriver: false,
    }).start();
  }, []);

  const validatePAN = () => {
    // PAN format: 5 uppercase letters, 4 digits, 1 uppercase letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      alert("Invalid PAN format. Please enter a valid PAN (e.g., ABCDE1234F).");
      return false;
    }
    return true;
  };

  const handleProceed = () => {
    if (validatePAN()) {
      // alert("PAN number is valid. Proceeding...");
      navigation.navigate("OTPScreen");
      //<TouchableOpacity style={styles.button} onPress={() => Navigation.navigate("PANInputScreen")}>
              //   <Text style={styles.buttonText}>Proceed →</Text>
              // </TouchableOpacity>
    }
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
        <Text style={styles.title}>Enter your PAN</Text>
        <Text style={styles.subtitle}>We use this to verify your identity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your PAN (e.g., ABCDE1234F)"
          maxLength={10}
          value={panNumber}
          onChangeText={(text) => setPanNumber(text.toUpperCase())} // Automatically convert input to uppercase
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
  input: {
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
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

export default PANInputScreen;
