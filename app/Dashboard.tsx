import React from 'react';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './index'; // Adjust the import path as needed
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  // Use the correct navigation prop type
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Y</Text>
        </View>
        <Text style={styles.userName}>Yogesh</Text>
      </View>

      {/* Portfolio Overview */}
      <View style={styles.portfolio}>
        <Text style={styles.assetsText}>Your Assets</Text>
        <Text style={styles.totalAssets}>₹2.43Cr</Text>

        <View style={styles.rowContainer}>
          <View style={styles.gainsContainer}>
              <Text style={styles.subText}>Total Invested</Text>
              <Text style={styles.amount}>₹1.89Cr</Text>
          </View> 
          <View style={styles.gainsContainer}>
              <Text style={styles.gainsLabel}>Overall Gains</Text>
              <Text style={styles.gains}>₹54L (28.5%)</Text>
          </View>
        </View>
        {/* Portfolio XIRR and Overall Gains in a row */}
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.subText}>Portfolio XIRR</Text>
            <Text style={styles.xirr}>21.2%</Text>
          </View>
          
        </View>
      </View>

      {/* Investment Sections */}
      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('MutualFundsPage')} // Navigate to MutualFundsPage
      >
        <Text style={styles.sectionTitle}>📅 Mutual Funds</Text>
        <Text style={styles.sectionSubtitle}>19 Funds</Text>
        <Text style={styles.amountRight}>₹1.61Cr</Text>
        <Text style={styles.performancePositive}>₹10L of outperformance vs benchmark</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.section}
        onPress={() => navigation.navigate('StockPortfolio')} // Navigate to StockPortfolio
      >
        <Text style={styles.sectionTitle}>📈 Stocks</Text>
        <Text style={styles.sectionSubtitle}>51 Stocks</Text>
        <Text style={styles.amountRight}>₹82.3L</Text>
        <Text style={styles.performanceNegative}>₹8.55L of missed gains vs benchmark</Text>
      </TouchableOpacity>

      {/* Portfolio Health */}
      <View style={styles.healthSection}>
        <Text style={styles.healthTitle}>Portfolio Health</Text>
        <Text style={styles.healthPoint}>✅ Top 25% in risk-adjusted returns among peers</Text>
        <Text style={styles.healthPoint}>✅ Consistent outperformance vs benchmark</Text>
      </View>
    </ScrollView>
  );
};

// Styles (unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  gainsContainer: {
    display: 'flex',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  portfolio: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  assetsText: {
    fontSize: 14,
    color: '#555',
  },
  totalAssets: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  amount: {
    fontSize: 21,
    fontWeight: 500,
    marginBottom: 10,
    marginLeft:0
  },
  xirr: {
    fontSize: 21,
    color: '#007AFF',
    fontWeight: 500,
  },
  gainsLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
  gains: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A9D58',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  performancePositive: {
    fontSize: 14,
    color: '#0A9D58',
    backgroundColor: '#E6FAEA',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  performanceNegative: {
    fontSize: 14,
    color: '#D32F2F',
    backgroundColor: '#FDECEC',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  amountRight: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: -25,
  },
  healthSection: {
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  healthPoint: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default Dashboard;