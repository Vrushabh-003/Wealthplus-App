import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import {RootStackParamList} from './index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Stock {
  name: string;
  xirr: number;
  description: string;
}

// interface PortfolioData {
//   Buy: Stock[];
//   Hold: Stock[];
//   Sell: Stock[];
// }

const DetailedAnalysis = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    const [PortfolioHealthDetailed, setPortfolioHealthDetailed] = useState<any>(null);
    

    const fetchData = async () => {
      try{
      const portfolioHealthDetailed = await AsyncStorage.getItem('MFPortfolioHealthDetailed');
      console.log('Fetched Data from AsyncStorage:', portfolioHealthDetailed); // Log data
      setPortfolioHealthDetailed(portfolioHealthDetailed ? JSON.parse(portfolioHealthDetailed) : {});
      } 
      catch (error) {
        console.error('Error fetching data:', error); // Log error
      }
   };

     useEffect(() => {
       fetchData();
     }, []);
   
    // useEffect(() => {
    //       const fetchPortfolioStatus = async () => {
    //         try {
    //           const response = await fetch('http://api.inwealthera.com/api/api/portfolio/getPortfolioHealthDetailed', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //               reqId: '15043487',
    //               mobile: '+919940615334',
    //               type: 'mutual_funds',
    //             }),
    //           });
    //           const data = await response.json();
    //           setPortfolioHealthDetailed(data);
    //           console.log('Portfolio status:', data);
    //           setLoading(false);
    //         } catch (error) {
    //           console.error('Error fetching portfolio status:', error);
    //         }
    //       };
      
    //       fetchPortfolioStatus();
    //     }, []);


        // Function to format numbers into 1K, 1L, 1Cr, etc.
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

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#007F00" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MutualFundsPage')}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Fund Recommendations</Text>
      </View>

      <View style={styles.sectionGood}>
  <Text style={styles.sectionTitleGood}>BUY</Text>
  <Text style={styles.sectionSubtitle}>Consider increasing position in these stocks</Text>
  {PortfolioHealthDetailed?.Buy?.map((stock: any, index: number) => (
    <View key={index} style={styles.cardGood}>

      {/* Stock Name & Market Value - Right Aligned */}
      <View>
        <Text style={styles.stockTitle}>{stock.schemeName}</Text>
        <Text style={styles.stockTitle}>Current Value ₹{formatNumber(stock.currentMktValue)}</Text>
      </View>

      {/* Stock XIRR & Benchmark Name with XIRR - Right Aligned */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.stockDetail}>
            Stock XIRR: <Text style={styles.positiveText}>{stock.schemeXirr}%</Text>
          </Text>
        </View>
        <Text style={styles.stockDetail}>
          {stock.benchmarkName} <Text style={styles.positiveText}>{stock.benchmarkXirr}%</Text>
      </Text>
      </View>

      {/* Stock Reason */}
      <Text style={styles.description}>{stock.reason}</Text>

    </View>
  ))}
</View>

<View style={styles.sectionMonitor}>
  <Text style={styles.sectionTitleMonitor}>HOLD</Text>
  <Text style={styles.sectionSubtitle}>Keep these positions under observation</Text>
  {PortfolioHealthDetailed?.Hold?.map((stock: any, index: number) => (
    <View key={index} style={styles.cardMonitor}>

      {/* Stock Name & Market Value - Right Aligned */}
      <View>
        <Text style={styles.stockTitle}>{stock.schemeName}</Text>
        <Text style={styles.stockTitle}>Current Value ₹{formatNumber(stock.currentMktValue)}</Text>
      </View>

      {/* Stock XIRR & Benchmark Name with XIRR - Right Aligned */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.stockDetail}>
            Stock XIRR: <Text style={styles.warningText}>{stock.schemeXirr}%</Text>
          </Text>
        </View>
        <Text style={styles.stockDetail}>
          {stock.benchmarkName} <Text style={styles.warningText}>{stock.benchmarkXirr}%</Text>
      </Text>
      </View>

      {/* Stock Reason */}
      <Text style={styles.description}>{stock.reason}</Text>

    </View>
  ))}
</View>


{/* <View style={styles.sectionLow}>
  <Text style={styles.sectionTitleLow}>SELL</Text>
  <Text style={styles.sectionSubtitle}>These stocks require immediate review</Text>
  {PortfolioHealthDetailed?.Sell?.map((stock: any, index: number) => (
    <View key={index} style={styles.cardLow}>
      <Text style={styles.stockTitle}>{stock.schemeName} ₹{formatNumber(stock.currentMktValue)}</Text>
      <Text style={styles.stockDetail}>
        Stock XIRR: <Text style={styles.negativeText}>{stock.schemeXirr}%</Text>
      </Text>
      <Text style={styles.stockDetail}>
        {stock.benchmarkName} <Text style={styles.negativeText}>{stock.benchmarkXirr}%</Text>
      </Text>
      <Text style={styles.description}>{stock.reason}</Text>
    </View>
  ))}
</View> */}

<View style={styles.sectionLow}>
  <Text style={styles.sectionTitleLow}>SELL</Text>
  <Text style={styles.sectionSubtitle}>These stocks require immediate review</Text>
  {PortfolioHealthDetailed?.Sell?.map((stock: any, index: number) => (
    <View key={index} style={styles.cardLow}>
      
      {/* Stock Name & Market Value - Right Aligned */}
      <View>
        <Text style={styles.stockTitle}>{stock.schemeName}</Text>
        <Text style={styles.stockTitle}>Current Value ₹{formatNumber(stock.currentMktValue)}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {/* Stock XIRR */}
      <View>
      <Text style={styles.stockDetail}>
        Stock XIRR: <Text style={styles.negativeText}>{stock.schemeXirr}%</Text>
      </Text>
      </View>

      {/* Benchmark Name & XIRR - Right Aligned */}
      <Text style={styles.stockDetail}>
          {stock.benchmarkName} <Text style={styles.negativeText}>{stock.benchmarkXirr}%</Text>
      </Text>

      </View>

      {/* Stock Reason */}
      <Text style={styles.description}>{stock.reason}</Text>
      
    </View>
  ))}
</View>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  sectionGood: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3D8E41', // Corrected to uppercase for consistency
  },
  sectionTitleGood: {
    fontSize: 18,
    fontWeight: 500,
    color: '#007F00',
  },
  sectionMonitor: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FA740C'
  },
  sectionTitleMonitor: {
    fontSize: 18,
    fontWeight: 500,
    color: '#D97706',
  },
  sectionLow: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CE524F',
  },
  sectionTitleLow: {
    fontSize: 18,
    fontWeight: 500,
    color: '#D32F2F',
  },
  cardGood: {
    backgroundColor: '#f0fff0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardMonitor: {
    backgroundColor: '#fffaf0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardLow: {
    backgroundColor: '#fff0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  stockTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#222',
  },
  stockDetail: {
    fontSize: 12,
    marginTop: 4,
  },
  positiveText: {
    color: '#007F00',
  },
  warningText: {
    color: '#D97706',
  },
  negativeText: {
    color: '#D32F2F',
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default DetailedAnalysis;
