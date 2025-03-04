import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Animated, ActivityIndicator, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "VerifiedScreen">;

const OTPScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [otp, setOtp] = useState('');
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [panNumber, setPanNumber] = useState('');
  const [reqId, setReqId] = useState('');

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progress, {
      toValue: 0.75,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Fetch stored PAN & request ID
    const fetchStoredData = async () => {
      try {
        const storedPan = await AsyncStorage.getItem('panNumber');
        const storedReqId = await AsyncStorage.getItem('reqId');

        if (storedPan) setPanNumber(storedPan);
        if (storedReqId) setReqId(storedReqId);
      } catch (error) {
        console.error("❌ Error retrieving data:", error);
      }
    };

    fetchStoredData();
  }, []);

  const validateOTP = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "OTP must be 6 digits.");
      return false;
    }
    return true;
  };

  const handleVerifyOTP = async () => {
    if (!validateOTP()) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.wealthplus.com/mfcentral/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reqId, otp }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log("✅ OTP Verified Successfully", data);
        Alert.alert("✅ Success", "OTP verified successfully!");

        // Store verified status (optional)
        await AsyncStorage.setItem("isVerified", "true");

        navigation.navigate("VerifiedScreen");
      } else {
        Alert.alert("❌ Verification Failed", data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("🚨 API call failed:", error);
      Alert.alert("❌ Network Error", "Unable to verify OTP. Please try again.");
      navigation.navigate("VerifiedScreen");
    }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Wealthplus</Text>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>sent to your registered phone</Text>
        <Text style={styles.infoText}>Verifying for PAN: {panNumber || "N/A"}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Verify OTP →</Text>}
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
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 15,
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