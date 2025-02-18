import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Animated, ActivityIndicator, Alert 
} from "react-native";
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const PANInputScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [panNumber, setPanNumber] = useState("ABCDE1234H");
  const [mobileNumber] = useState("+919550755111"); // Static mobile number for now
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 0.5,
      duration: 1000, // 1 second
      useNativeDriver: false,
    }).start();
  }, []);

  const validatePAN = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panNumber)) {
      Alert.alert("Invalid PAN", "Please enter a valid PAN (e.g., ABCDE1234F).");
      return false;
    }
    return true;
  };

  const handleProceed = async () => {
    if (!validatePAN()) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.wealthplus.com/mfcentral/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pan: panNumber,
          mobile: mobileNumber,
          fromDate: "01-Jan-2021", // Replace with actual date if needed
          toDate: "07-Jan-2021", // Replace with actual date if needed
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log("✅ OTP Sent Successfully", data);
        navigation.navigate("OTPScreen");
      } else {
        Alert.alert("❌ Error", data.message || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("🚨 API call failed:", error);
      Alert.alert("❌ Network Error", "Unable to connect. Please try again.");
    }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Wealthplus</Text>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter your PAN</Text>
        <Text style={styles.subtitle}>We use this to verify your identity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your PAN (e.g., ABCDE1234F)"
          maxLength={10}
          value={panNumber}
          onChangeText={(text) => setPanNumber(text.toUpperCase())}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleProceed} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Proceed →</Text>
          )}
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
