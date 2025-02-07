import React, { useState, useEffect, useCallback } from 'react';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity, BackHandler,  Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from './index'; // Adjust the import path as needed
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const Dashboard = () => {
  // Use the correct navigation prop type
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = React.useState();
  const [loading, setLoading] = useState(true);
  const [Portfoliostatus, setPortfolioStatus] = React.useState();

  const [Portfoliohealth, setPortfolioHealth] = useState<any>(null);
  const [Portfoliodetails, setPortfolioDetails] = useState<any>(null);
  const [Portfolioheader, setPortfolioHeader] = useState<any>(null);
  const [PortfolioXirrAnalysis, setPortfolioXirrAnalysis] = useState<any>(null);
  const fetchData = async () => {
    try {
      const portfolioXirrAnalysis = await AsyncStorage.getItem('MFPortfolioXirrAnalysis');
      const portfolioHeader = await AsyncStorage.getItem('MFPortfolioheader');
      const portfolioDetails = await AsyncStorage.getItem('MFPortfoliodetails');
      const portfolioHealth = await AsyncStorage.getItem('MFPortfoliohealth');
  
      console.log('Fetched Data:', { portfolioXirrAnalysis, portfolioHeader, portfolioDetails, portfolioHealth });
  
      // Check if data is valid before updating state
      const parsedXirr = portfolioXirrAnalysis ? JSON.parse(portfolioXirrAnalysis) : {};
      const parsedHeader = portfolioHeader ? JSON.parse(portfolioHeader) : {};
      const parsedDetails = portfolioDetails ? JSON.parse(portfolioDetails) : {};
      const parsedHealth = portfolioHealth ? JSON.parse(portfolioHealth) : {};
  
      console.log('Parsed Data:', { parsedXirr, parsedHeader, parsedDetails, parsedHealth });
  
      // Update state only if parsed data is valid
      setPortfolioXirrAnalysis(parsedXirr);
      setPortfolioHeader(parsedHeader);
      setPortfolioDetails(parsedDetails);
      setPortfolioHealth(parsedHealth);
  
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
      setLoading(false);  // Ensure loading is stopped even in case of error
    }
  };
  
  
  


  const formatNumber = (num: string) => {
    const number = parseFloat(num);  // Convert the string to a number
  
    if (isNaN(number)) return "Invalid value"; // Return if it's not a valid number
  
    if (number >= 10000000) {
      // For Crores (10 million and above)
      return (number / 10000000).toFixed(2) + 'Cr'; // Keeping 2 decimals for Cr
    } else if (number >= 100000) {
      // For Lakhs (100 thousand and above)
      return (number / 100000).toFixed(2) + 'L'; // Keeping 2 decimals for L
    } else if (number >= 1000) {
      // For Thousands
      return (number / 1000).toFixed(2) + 'K'; // Keeping 2 decimals for K
    } else {
      return number.toString(); // For smaller numbers
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Exit App', 'Do you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, [])
  );

  if (loading || !PortfolioXirrAnalysis || !Portfoliodetails ||!Portfolioheader ||!Portfoliohealth){
    return(
      <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#aaaaaa" />
      </View>

    );
  }
  
  const isPortfolioXirrGreaterThanBenchmark =
  PortfolioXirrAnalysis && Number(PortfolioXirrAnalysis.portfolioXirr) > Number(PortfolioXirrAnalysis.benchmarkXirr);

  const isBenchmarkXirrGreaterThanPortfolio =
  PortfolioXirrAnalysis && Number(PortfolioXirrAnalysis.benchmarkXirr) > Number(PortfolioXirrAnalysis.portfolioXirr);

  let greaterValue = 0,
  smallerValue = 0,
  difference = 0,
  greaterLabel = '',
  smallerLabel = '';

  if (PortfolioXirrAnalysis) {
    const portfolioXirrNum = Number(PortfolioXirrAnalysis.portfolioXirr);
    const benchmarkXirrNum = Number(PortfolioXirrAnalysis.benchmarkXirr);

    if (portfolioXirrNum >= benchmarkXirrNum) {
      greaterValue = portfolioXirrNum;
      smallerValue = benchmarkXirrNum;
      greaterLabel = "Portfolio XIRR";
      smallerLabel = "Benchmark XIRR";
    } else {
      greaterValue = benchmarkXirrNum;
      smallerValue = portfolioXirrNum;
      greaterLabel = "Benchmark XIRR";
      smallerLabel = "Portfolio XIRR";
    }
    difference = greaterValue - smallerValue;
  }

  const mfdiff=(difference/100)*Portfolioheader.currentMktValue

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
        <Text style={styles.totalAssets}>₹{formatNumber(Portfolioheader.currentMktValue)}</Text>

        <View style={styles.rowContainer}>
          <View style={styles.gainsContainer}>
              <Text style={styles.subText}>Total Invested</Text>
              <Text style={styles.amount}>₹{formatNumber(Portfolioheader.costValue)}</Text>
          </View> 
          <View style={styles.gainsContainer}>
              <Text style={styles.gainsLabel}>Overall Gains</Text>
              <Text style={styles.gains}>₹{(formatNumber(Portfolioheader.gainLoss))+" ("+(Portfolioheader.gainLossPercentage)+")%"}</Text>
          </View>
        </View>
        {/* Portfolio XIRR and Overall Gains in a row */}
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.subText}>Portfolio XIRR</Text>
            <Text style={styles.xirr}>{`+${PortfolioXirrAnalysis.portfolioXirr.toFixed(2)}%`}</Text>
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
        <Text style={styles.amountRight}>₹{formatNumber(Portfolioheader.currentMktValue)}</Text>

{  isPortfolioXirrGreaterThanBenchmark &&      (<Text style={styles.performancePositive}>₹{(formatNumber(String(mfdiff)))} of outperformance vs benchmark</Text>)}        
{  isBenchmarkXirrGreaterThanPortfolio &&      (<Text style={styles.performanceNegative}>₹{(formatNumber(String(mfdiff)))} of underperformance vs benchmark</Text>)}        
    
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
  centerContainer: {
    flex: 1,
    color: '#777777',
    justifyContent: 'center',
    alignItems: 'center',
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