import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PortfolioData {
  totalInvested: string;
  overallGains: string;
  portfolioXirr: string;
  benchmarkXirr: string;
  potentialEarnings: string;
  analysisSummary: string;
  beta: string;
  rSquared: string;
  sharpeRatio: string;
}

type RootStackParamList = {
  MutualFundsPage: undefined;
};

type MutualFundsPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MutualFundsPage'>;
  route: RouteProp<RootStackParamList, 'MutualFundsPage'>;
};

const MutualFundsPage: React.FC<MutualFundsPageProps> = ({ navigation }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulating the API response with dummy data
        const response = {
          data: {
            totalInvested: "₹1.6Cr",
            overallGains: "₹28.4L (23.67%)",
            portfolioXirr: "+20.21%",
            benchmarkXirr: "+19.55%",
            potentialEarnings: "₹5.47L",
            analysisSummary: "Your portfolio shows a balanced mix with strong performers leading the growth.",
            beta: "1.82",
            rSquared: "0.76",
            sharpeRatio: "1.2",
          }
        };
        setPortfolioData(response.data);
      } catch (err) {
        setError("Failed to fetch portfolio data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={30} color="#000" />
    </TouchableOpacity>
        <Text style={styles.title}>Mutual Funds</Text>
      </View>

      {portfolioData && (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Total Invested</Text>
            <Text style={styles.cardText}>{portfolioData.totalInvested}</Text>
            <Text style={styles.cardTitle}>Overall Gains</Text>
            <Text style={styles.cardText}>{portfolioData.overallGains}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>How did your portfolio perform?</Text>
            <View style={styles.performanceContainer}>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceText}>{portfolioData.portfolioXirr}</Text>
                <Text>Portfolio XIRR</Text>
              </View>
              <View style={styles.performanceCard}>
                <Text style={styles.performanceText}>{portfolioData.benchmarkXirr}</Text>
                <Text>Benchmark XIRR</Text>
              </View>
            </View>
            <Text style={styles.cardText}>Your portfolio could have potentially earned {portfolioData.potentialEarnings} more with active investing</Text>
          </View>

          <View style={styles.analysisSection}>
            <Text style={styles.cardTitle}>Mutual Fund Analysis</Text>
            <View style={styles.graphContainer}>
              <Image source={{ uri: '/path-to-your-chart-image.png' }} style={styles.chartImage} />
            </View>
            <Text style={styles.cardText}>{portfolioData.analysisSummary}</Text>
            <Text style={styles.cardText}>Consider rebalancing low-performing funds to optimize returns.</Text>
          </View>

          <View style={styles.strongPerformance}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{portfolioData.beta}</Text>
              <Text>Beta</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{portfolioData.rSquared}</Text>
              <Text>R-squared</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{portfolioData.sharpeRatio}</Text>
              <Text>Sharpe Ratio</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#3b3b3b',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#4caf50',
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  performanceCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  performanceText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  analysisSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartImage: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
  strongPerformance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 5,
  },
  metricValue: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default MutualFundsPage;
