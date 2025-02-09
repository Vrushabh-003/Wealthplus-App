import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RootStackParamList } from "./index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PhoneNumberScreen">;

const VerifiedScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [portfolioData, setPortfolioData] = useState({
    health: {},
    header: {},
    details: {},
    xirrAnalysis: {},
    healthdetailed: {},
  });

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Clear old data before fetching new data
        await AsyncStorage.multiRemove([
          'MFPortfoliodetails',
          'MFPortfolioheader',
          'MFPortfoliohealth',
          'MFPortfolioXirrAnalysis',
          'MFPortfolioHealthDetailed',
        ]);

        const responses = await Promise.all([
          fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHealth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          }),
          fetch('http://api.inwealthera.com/api/portfolio/getPortfolioHeader', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          }),
          fetch('http://api.inwealthera.com/api/portfolio/getPortfolioDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          }),
          fetch('http://api.inwealthera.com/api/portfolio/getPortfolioXirrAnalysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          }),
          fetch('http://api.inwealthera.com/api/api/portfolio/getPortfolioHealthDetailed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reqId: '15043487',
              mobile: '+919940615334',
              type: 'mutual_funds',
            }),
          }),
        ]);

        const [health, header, details, xirrAnalysis, healthdetailed] = await Promise.all(
          responses.map((res) => res.json())
        );

        // Check if any of the responses are invalid (null/undefined)
        if (health && header && details && xirrAnalysis && healthdetailed) {
          setPortfolioData({ health, header, details, xirrAnalysis, healthdetailed });
          console.log('Portfolio data:', { health, header, details, xirrAnalysis, healthdetailed });

          // Save data to AsyncStorage
          await AsyncStorage.setItem('MFPortfoliodetails', JSON.stringify(details));
          await AsyncStorage.setItem('MFPortfolioheader', JSON.stringify(header));
          await AsyncStorage.setItem('MFPortfoliohealth', JSON.stringify(health));
          await AsyncStorage.setItem('MFPortfolioXirrAnalysis', JSON.stringify(xirrAnalysis));
          await AsyncStorage.setItem('MFPortfolioHealthDetailed', JSON.stringify(healthdetailed));
        } else {
          setError('One or more responses were invalid');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('An error occurred while fetching the data.');
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchPortfolioData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading, navigation]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#aaaaaa" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>WealthPlus</Text>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
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
    color: '#4CAF50',
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
    backgroundColor: '#4CAF50',
  },
  verificationContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  tickMark: {
    fontSize: 50,
    color: '#4CAF50',
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default VerifiedScreen;
